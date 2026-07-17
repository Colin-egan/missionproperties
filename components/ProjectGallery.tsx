'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface Props {
  images: string[]
  projectName: string
}

export default function ProjectGallery({ images, projectName }: Props) {
  const [openAt, setOpenAt] = useState<number | null>(null)
  const alt = (i: number) => `${projectName} — photo ${i + 1}`

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: 'var(--border)' }}
      >
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setOpenAt(i)}
            aria-label={`Enlarge ${alt(i)}`}
            className="group relative bg-cream overflow-hidden"
            style={{ aspectRatio: '4/3', cursor: 'zoom-in', padding: 0, border: 'none' }}
          >
            <Image
              src={img}
              alt={alt(i)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Zoom affordance, revealed on hover */}
            <span
              aria-hidden
              className="absolute bottom-3 right-3 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                width: '2rem',
                height: '2rem',
                background: 'rgba(26,23,20,0.65)',
                color: 'var(--cream)',
                fontSize: '0.85rem',
              }}
            >
              ⤢
            </span>
          </button>
        ))}
      </div>

      {openAt !== null && (
        <Lightbox
          images={images}
          index={openAt}
          alt={alt}
          onIndexChange={setOpenAt}
          onClose={() => setOpenAt(null)}
          projectName={projectName}
        />
      )}
    </>
  )
}
