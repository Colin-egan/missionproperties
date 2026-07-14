import ProjectGallery from './ProjectGallery'
import type { CompletedProject } from '@/lib/completed-projects'

interface Props {
  project: CompletedProject
  status?: string
}

export default function ProjectTabs({ project, status = 'Completed' }: Props) {
  // The hero image is always the first entry of `images`, so a single-image
  // project has no gallery worth showing beneath it.
  const hasGallery = project.images.length > 1

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
      {/* Overview */}
      <section id="overview" className="section-pad" style={{ background: 'var(--warm-white)' }}>
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
                      { label: 'Status', value: status },
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

      {/* Gallery — sits directly below the overview */}
      {hasGallery && (
        <section
          id="gallery"
          className="section-pad"
          style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}
        >
          <div className="container-site">
            <div className="mb-8">
              <div className="bronze-rule mb-4" />
              <h2
                className="font-display font-light text-charcoal"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.25 }}
              >
                Gallery
              </h2>
            </div>
            <ProjectGallery images={project.images} projectName={project.name} />
          </div>
        </section>
      )}
    </div>
  )
}
