'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { CompletedProject } from '@/lib/completed-projects'

interface Props {
  project: CompletedProject
  imgPath: (filename: string) => string
}

const tabs = ['Overview', 'Gallery'] as const
type Tab = typeof tabs[number]

export default function ProjectTabs({ project, imgPath }: Props) {
  const [active, setActive] = useState<Tab>('Overview')

  const hasOverviewContent =
    project.description ||
    project.units ||
    project.unitTypes ||
    project.squareFootage ||
    project.yearCompleted ||
    (project.amenities && project.amenities.length > 0) ||
    (project.features && project.features.length > 0)

  return (
    <div>
      {/* Tab bar */}
      <div
        className="sticky top-0 z-10"
        style={{ background: 'var(--warm-white)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container-site">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="font-sans text-xs px-6 py-4 transition-colors"
                style={{
                  letterSpacing: '0.1em',
                  borderBottom: active === tab ? '2px solid var(--bronze)' : '2px solid transparent',
                  color: active === tab ? 'var(--charcoal)' : 'var(--warm-gray)',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview tab */}
      {active === 'Overview' && (
        <section className="section-pad" style={{ background: 'var(--warm-white)' }}>
          <div className="container-site">
            {hasOverviewContent ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Description */}
                <div className="lg:col-span-2">
                  {project.description && (
                    <>
                      <div className="bronze-rule mb-4" />
                      <h2
                        className="font-display font-light text-charcoal mb-6"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.25 }}
                      >
                        About This Project
                      </h2>
                      <p
                        className="font-sans"
                        style={{ color: 'var(--warm-gray)', lineHeight: 1.75, fontSize: '1rem' }}
                      >
                        {project.description}
                      </p>
                    </>
                  )}

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mt-10">
                      <h3
                        className="font-sans text-xs mb-4"
                        style={{ letterSpacing: '0.12em', color: 'var(--warm-gray)' }}
                      >
                        FEATURES
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((f) => (
                          <li
                            key={f}
                            className="font-sans text-sm flex items-start gap-2"
                            style={{ color: 'var(--charcoal)' }}
                          >
                            <span style={{ color: 'var(--bronze)', marginTop: '0.2em', flexShrink: 0 }}>—</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Amenities */}
                  {project.amenities && project.amenities.length > 0 && (
                    <div className="mt-10">
                      <h3
                        className="font-sans text-xs mb-4"
                        style={{ letterSpacing: '0.12em', color: 'var(--warm-gray)' }}
                      >
                        AMENITIES
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.amenities.map((a) => (
                          <li
                            key={a}
                            className="font-sans text-sm flex items-start gap-2"
                            style={{ color: 'var(--charcoal)' }}
                          >
                            <span style={{ color: 'var(--bronze)', marginTop: '0.2em', flexShrink: 0 }}>—</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Stats sidebar */}
                <div>
                  <div
                    className="p-6"
                    style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}
                  >
                    <h3
                      className="font-sans text-xs mb-6"
                      style={{ letterSpacing: '0.12em', color: 'var(--warm-gray)' }}
                    >
                      PROJECT DETAILS
                    </h3>
                    <div className="flex flex-col gap-5">
                      {[
                        { label: 'Location', value: project.location },
                        project.units && { label: 'Total Units', value: project.units },
                        project.unitTypes && { label: 'Unit Types', value: project.unitTypes },
                        project.squareFootage && { label: 'Square Footage', value: project.squareFootage },
                        project.yearCompleted && { label: 'Year Completed', value: project.yearCompleted },
                        { label: 'Status', value: 'Completed' },
                      ]
                        .filter(Boolean)
                        .map((item) => {
                          const { label, value } = item as { label: string; value: string }
                          return (
                            <div key={label} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
                              <p
                                className="font-sans text-xs mb-1"
                                style={{ letterSpacing: '0.08em', color: 'var(--warm-gray)' }}
                              >
                                {label.toUpperCase()}
                              </p>
                              <p
                                className="font-sans text-sm font-medium"
                                style={{ color: label === 'Status' ? 'var(--bronze)' : 'var(--charcoal)' }}
                              >
                                {value}
                              </p>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Fallback if no overview data */
              <div className="text-center py-16">
                <p className="font-sans text-sm" style={{ color: 'var(--warm-gray)' }}>
                  Project details coming soon.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery tab */}
      {active === 'Gallery' && (
        <section className="section-pad" style={{ background: 'var(--warm-white)' }}>
          <div className="container-site">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: 'var(--border)' }}
            >
              {project.images.map((img, i) => (
                <div
                  key={img}
                  className="relative bg-cream overflow-hidden"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={imgPath(img)}
                    alt={`${project.name} — photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
