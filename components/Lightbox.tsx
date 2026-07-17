'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  index: number
  alt: (i: number) => string
  onIndexChange: (i: number) => void
  onClose: () => void
  projectName?: string
}

const MAX_SCALE = 4
const ZOOM_STEP = 2.5

export default function Lightbox({ images, index, alt, onIndexChange, onClose, projectName }: Props) {
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const frameRef = useRef<HTMLDivElement>(null)

  // Active pointers, keyed by pointerId, so one pointer pans and two pinch.
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null)
  const panStart = useRef<{ x: number; y: number; offset: { x: number; y: number } } | null>(null)
  const moved = useRef(false)
  const lastTap = useRef(0)

  const zoomed = scale > 1

  const reset = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const go = useCallback(
    (delta: number) => {
      reset()
      onIndexChange((index + delta + images.length) % images.length)
    },
    [index, images.length, onIndexChange, reset]
  )

  // Clamp panning so the image can never be dragged off its own frame.
  const clamp = useCallback((next: { x: number; y: number }, atScale: number) => {
    const frame = frameRef.current
    if (!frame) return next
    const maxX = (frame.clientWidth * (atScale - 1)) / 2
    const maxY = (frame.clientHeight * (atScale - 1)) / 2
    return {
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    }
  }, [])

  // Zoom toward a point in the frame so the tapped detail stays under the finger.
  const zoomToPoint = useCallback(
    (clientX: number, clientY: number) => {
      const frame = frameRef.current
      if (!frame) return
      if (zoomed) {
        reset()
        return
      }
      const rect = frame.getBoundingClientRect()
      const dx = clientX - (rect.left + rect.width / 2)
      const dy = clientY - (rect.top + rect.height / 2)
      const next = { x: -dx * (ZOOM_STEP - 1), y: -dy * (ZOOM_STEP - 1) }
      setScale(ZOOM_STEP)
      setOffset(clamp(next, ZOOM_STEP))
    },
    [zoomed, reset, clamp]
  )

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    moved.current = false

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale }
      panStart.current = null
    } else if (pointers.current.size === 1) {
      panStart.current = { x: e.clientX, y: e.clientY, offset }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      const next = Math.min(MAX_SCALE, Math.max(1, (dist / pinchStart.current.dist) * pinchStart.current.scale))
      moved.current = true
      setScale(next)
      setOffset((o) => clamp(o, next))
      return
    }

    if (pointers.current.size === 1 && panStart.current && zoomed) {
      const dx = e.clientX - panStart.current.x
      const dy = e.clientY - panStart.current.y
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true
      setOffset(clamp({ x: panStart.current.offset.x + dx, y: panStart.current.offset.y + dy }, scale))
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const start = panStart.current
    const wasSinglePointer = pointers.current.size === 1
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchStart.current = null
    if (pointers.current.size === 0) panStart.current = null

    if (!wasSinglePointer || !start) return

    const dx = e.clientX - start.x
    const dy = e.clientY - start.y

    // Horizontal swipe at rest advances the gallery.
    if (!zoomed && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) && images.length > 1) {
      go(dx < 0 ? 1 : -1)
      return
    }

    if (moved.current) return

    // A second tap within 300ms is a double-tap: zoom. A lone tap toggles too,
    // so a single tap on a phone still enlarges without waiting.
    const now = Date.now()
    const isDoubleTap = now - lastTap.current < 300
    lastTap.current = now
    if (isDoubleTap && zoomed) {
      reset()
    } else {
      zoomToPoint(e.clientX, e.clientY)
    }
  }

  const onWheel = (e: React.WheelEvent) => {
    const next = Math.min(MAX_SCALE, Math.max(1, scale - e.deltaY * 0.003))
    setScale(next)
    setOffset((o) => clamp(next === 1 ? { x: 0, y: 0 } : o, next))
  }

  // Keyboard: escape closes, arrows page through the gallery.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Lock the page behind the overlay.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt(index)}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(26,23,20,0.96)', touchAction: 'none' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        <span className="font-sans text-xs" style={{ color: 'rgba(244,239,230,0.5)', letterSpacing: '0.1em' }}>
          {index + 1} / {images.length}
        </span>
        <div className="flex items-center gap-5">
          {zoomed && (
            <button
              onClick={reset}
              className="font-sans text-xs transition-opacity hover:opacity-70"
              style={{ color: 'rgba(244,239,230,0.5)', letterSpacing: '0.1em', background: 'none', cursor: 'pointer' }}
            >
              RESET
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="font-sans text-xl leading-none transition-opacity hover:opacity-70"
            style={{ color: 'var(--cream)', background: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Image stage */}
      <div
        ref={frameRef}
        className="relative flex-1 overflow-hidden select-none"
        style={{ cursor: zoomed ? 'grab' : 'zoom-in' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={alt(index)}
          fill
          priority
          className="object-contain"
          sizes="100vw"
          draggable={false}
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: pointers.current.size ? 'none' : 'transform 250ms ease-out',
            willChange: 'transform',
          }}
        />
        {projectName && (
          <span
            aria-hidden
            className="absolute bottom-4 left-4 font-sans text-xs pointer-events-none"
            style={{
              background: 'rgba(26,23,20,0.55)',
              color: 'rgba(244,239,230,0.85)',
              letterSpacing: '0.08em',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {projectName.toUpperCase()}
          </span>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        {images.length > 1 ? (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="font-sans text-xs px-4 py-2 transition-opacity hover:opacity-70"
              style={{
                border: '1px solid rgba(244,239,230,0.2)',
                color: 'rgba(244,239,230,0.7)',
                letterSpacing: '0.12em',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              ← PREV
            </button>
            <span className="font-sans text-xs" style={{ color: 'rgba(244,239,230,0.35)', letterSpacing: '0.08em' }}>
              {zoomed ? 'DRAG TO PAN' : 'TAP IMAGE TO ZOOM'}
            </span>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="font-sans text-xs px-4 py-2 transition-opacity hover:opacity-70"
              style={{
                border: '1px solid rgba(244,239,230,0.2)',
                color: 'rgba(244,239,230,0.7)',
                letterSpacing: '0.12em',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              NEXT →
            </button>
          </>
        ) : (
          <span className="font-sans text-xs mx-auto" style={{ color: 'rgba(244,239,230,0.35)', letterSpacing: '0.08em' }}>
            {zoomed ? 'DRAG TO PAN' : 'TAP IMAGE TO ZOOM'}
          </span>
        )}
      </div>
    </div>
  )
}
