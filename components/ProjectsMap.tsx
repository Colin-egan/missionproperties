'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { CompletedProject } from '@/lib/completed-projects'

interface ProjectsMapProps {
  projects: CompletedProject[]
}

export default function ProjectsMap({ projects }: ProjectsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const router = useRouter()
  const [tokenMissing, setTokenMissing] = useState(false)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      setTokenMissing(true)
      return
    }
    if (!containerRef.current || mapRef.current) return

    const located = projects.filter(
      (p): p is CompletedProject & { latitude: number; longitude: number } =>
        p.latitude != null && p.longitude != null
    )
    if (located.length === 0) return

    mapboxgl.accessToken = token

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [located[0].longitude, located[0].latitude],
      zoom: 7,
      cooperativeGestures: true,
    })
    mapRef.current = map

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

    if (!document.getElementById('mp-mapbox-popup-style')) {
      const style = document.createElement('style')
      style.id = 'mp-mapbox-popup-style'
      style.textContent = '.mapboxgl-popup-content{padding:0;overflow:hidden;border-radius:4px;}'
      document.head.appendChild(style)
    }

    const bounds = new mapboxgl.LngLatBounds()
    const openPopups = new Set<mapboxgl.Popup>()

    located.forEach((project) => {
      const href = `/${project.status === 'current' ? 'current-projects' : 'completed-projects'}/${project.slug}`

      const el = document.createElement('div')
      el.style.width = '14px'
      el.style.height = '14px'
      el.style.borderRadius = '50%'
      el.style.background = '#B8773A'
      el.style.border = '2px solid #FDFAF5'
      el.style.boxShadow = '0 1px 4px rgba(26,23,20,0.4)'
      el.style.cursor = 'pointer'

      const popup = new mapboxgl.Popup({ offset: 16, closeButton: false, maxWidth: '220px' }).setHTML(
        `<div>
          ${
            project.heroImage
              ? `<img src="${escapeHtml(
                  project.heroImage
                )}" alt="" style="width:100%; height:110px; object-fit:cover; display:block;" />`
              : ''
          }
          <div style="padding: 8px 10px 10px;">
            <div style="font-weight: 600; font-size: 0.85rem; color: #1A1714; margin-bottom: 2px;">${escapeHtml(
              project.name
            )}</div>
            <div style="font-size: 0.75rem; color: #857D75; margin-bottom: 4px;">${escapeHtml(project.location)}</div>
            <div style="font-size: 0.68rem; color: #B8773A; letter-spacing: 0.04em;">Click again to view project →</div>
          </div>
        </div>`
      )

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([project.longitude, project.latitude])
        .setPopup(popup)
        .addTo(map)

      let selected = false

      popup.on('open', () => {
        openPopups.forEach((p) => {
          if (p !== popup) p.remove()
        })
        openPopups.add(popup)
        selected = true
      })

      popup.on('close', () => {
        openPopups.delete(popup)
        selected = false
      })

      // Mapbox toggles the popup via a click listener on the *map*, not the
      // marker element, so this listener on the element itself always fires
      // first (native DOM bubbling) and can intercept the second click
      // before Mapbox's own handler would toggle the popup closed.
      el.addEventListener('click', (e) => {
        if (selected) {
          e.stopPropagation()
          router.push(href)
        }
      })

      bounds.extend([project.longitude, project.latitude])
    })

    if (located.length > 1) {
      map.fitBounds(bounds, { padding: 48, maxZoom: 12, duration: 0 })
    }

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [projects, router])

  if (tokenMissing) {
    return (
      <div
        className="flex items-center justify-center aspect-[4/3] md:aspect-auto md:h-[420px]"
        style={{ background: 'var(--border)', color: 'var(--warm-gray)' }}
      >
        <p className="font-sans text-sm px-6 text-center">Map unavailable — missing Mapbox token.</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="aspect-[4/3] md:aspect-auto md:h-[420px]"
      style={{ width: '100%' }}
    />
  )
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
