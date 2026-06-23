'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  label: string
  sublabel?: string
}

export default function StatCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  label,
  sublabel,
}: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [started, end, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-stat">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="bronze-rule mx-auto my-4" />
      <p className="label-md text-charcoal">{label}</p>
      {sublabel && (
        <p className="font-sans text-xs mt-1" style={{ color: 'var(--warm-gray)' }}>{sublabel}</p>
      )}
    </div>
  )
}
