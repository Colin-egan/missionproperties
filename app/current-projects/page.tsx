import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import PageHeader from '@/components/PageHeader'
import { getCurrentProjects, getHeaderImage, PHASE_LABELS, type CompletedProject } from '@/lib/completed-projects'

function ProjectGrid({ projects, delayOffset = 0 }: { projects: CompletedProject[]; delayOffset?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
      {projects.map((proj, i) => (
        <ScrollReveal key={proj.slug} delay={(delayOffset + i) * 80}>
          <Link
            href={`/current-projects/${proj.slug}`}
            id={proj.slug}
            className="project-card bg-warm-white flex flex-col h-full group"
          >
            {/* Image */}
            <div className="overflow-hidden" style={{ height: '220px', position: 'relative' }}>
              {proj.heroImage && (
                <Image
                  src={proj.heroImage}
                  alt={proj.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              {proj.images.length > 1 && (
                <div className="absolute top-4 right-4">
                  <span
                    className="font-sans px-2 py-1"
                    style={{
                      background: 'rgba(26,23,20,0.65)',
                      color: 'rgba(244,239,230,0.7)',
                      letterSpacing: '0.1em',
                      fontSize: '0.6rem',
                    }}
                  >
                    {proj.images.length} PHOTOS
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3
                className="font-display font-light text-charcoal mb-1 transition-colors group-hover:text-bronze"
                style={{ fontSize: '1.4rem' }}
              >
                {proj.name}
              </h3>
              <p className="font-sans text-xs mb-4" style={{ color: 'var(--warm-gray)' }}>
                {proj.location}
              </p>
              <p className="font-sans text-sm leading-relaxed flex-1" style={{ color: 'var(--warm-gray)' }}>
                {proj.description}
              </p>
              <span
                className="font-sans text-xs mt-6 transition-opacity opacity-60 group-hover:opacity-100"
                style={{ color: 'var(--bronze)', letterSpacing: '0.12em' }}
              >
                VIEW PROJECT →
              </span>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  )
}

export const metadata = {
  title: 'Current Projects — Mission Properties',
  description:
    'Explore Mission Properties\' current multifamily developments across the Carolinas and greater Southeast.',
}

export default async function CurrentProjectsPage() {
  const [projects, headerImage] = await Promise.all([getCurrentProjects(), getHeaderImage()])

  const underConstruction = projects.filter((p) => (p.phase ?? 'under_construction') === 'under_construction')
  const inPipeline = projects.filter((p) => p.phase === 'in_pipeline')

  return (
    <>
      {/* ── Page header ───────────────────────────────────────── */}
      <PageHeader eyebrow="Portfolio" title="Current Projects" headerImage={headerImage}>
        <p
          className="font-sans text-base"
          style={{ color: 'rgba(244,239,230,0.5)', maxWidth: '52ch' }}
        >
          Active developments across Mooresville, Cornelius, Charlotte, Concord, Greensboro, and Charleston.
        </p>
      </PageHeader>

      {/* ── Under Construction ───────────────────────────────── */}
      {underConstruction.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <ScrollReveal>
              <div className="mb-10">
                <div className="bronze-rule mb-4" />
                <h2 className="text-display-lg">{PHASE_LABELS.under_construction}</h2>
              </div>
            </ScrollReveal>
            <ProjectGrid projects={underConstruction} />
          </div>
        </section>
      )}

      {/* ── In the Pipeline ──────────────────────────────────── */}
      {inPipeline.length > 0 && (
        <section
          className="section-pad"
          style={underConstruction.length > 0 ? { background: 'var(--cream)', borderTop: '1px solid var(--border)' } : undefined}
        >
          <div className="container-site">
            <ScrollReveal>
              <div className="mb-10">
                <div className="bronze-rule mb-4" />
                <h2 className="text-display-lg">{PHASE_LABELS.in_pipeline}</h2>
              </div>
            </ScrollReveal>
            <ProjectGrid projects={inPipeline} delayOffset={underConstruction.length} />
          </div>
        </section>
      )}

      {/* ── Summary stats ─────────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: 'var(--charcoal)' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {([
              { value: `${projects.length}`, label: 'Active Developments' },
              {
                value: `${projects
                  .reduce((a, b) => a + (parseInt(b.units ?? '0', 10) || 0), 0)
                  .toLocaleString()}+`,
                label: 'Units In Progress',
              },
              { value: '6', label: 'Southeast Markets' },
            ]).map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-8 sm:py-6 px-6 ${
                  i === 0
                    ? 'border-b sm:border-b-0'
                    : i === 1
                    ? 'border-b sm:border-b-0 sm:border-l'
                    : 'sm:border-l'
                }`}
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="font-display font-light text-cream" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <p className="label-sm mt-3" style={{ color: 'rgba(244,239,230,0.35)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-pad bg-warm-white">
        <div className="container-site">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="bronze-rule mb-4" />
                <h2 className="text-display-md mb-2">View our completed portfolio.</h2>
                <p className="font-sans text-base" style={{ color: 'var(--warm-gray)' }}>
                  40+ projects delivered across the Southeast United States.
                </p>
              </div>
              <Link href="/completed-projects" className="btn-primary shrink-0">Completed Projects</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
