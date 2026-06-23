import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { completedProjects } from '@/lib/completed-projects'

export function generateStaticParams() {
  return completedProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = completedProjects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Mission Properties`,
    description: `${project.name} — a completed multifamily development by Mission Properties in ${project.location}.`,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = completedProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  const imgPath = (filename: string) =>
    `/images/completed-projects/${project.slug}/${encodeURIComponent(filename)}`

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative" style={{ height: 'clamp(360px, 55vh, 640px)' }}>
        <Image
          src={imgPath(project.heroImage)}
          alt={project.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,23,20,0.35) 0%, rgba(26,23,20,0.65) 100%)' }} />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-site pb-10 md:pb-14">
            <Link
              href="/completed-projects"
              className="inline-flex items-center gap-2 font-sans text-xs mb-6 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(244,239,230,0.55)', letterSpacing: '0.1em' }}
            >
              ← COMPLETED PROJECTS
            </Link>
            <h1 className="text-display-lg text-cream mb-2">{project.name}</h1>
            <p className="font-sans text-sm" style={{ color: 'rgba(244,239,230,0.55)' }}>
              {project.address}
            </p>
          </div>
        </div>
      </section>

      {/* ── Info bar ──────────────────────────────────────────── */}
      <section className="py-6" style={{ background: 'var(--charcoal)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <p className="label-sm mb-1" style={{ color: 'rgba(244,239,230,0.35)' }}>Location</p>
              <p className="font-sans text-sm text-cream">{project.location}</p>
            </div>
            <div>
              <p className="label-sm mb-1" style={{ color: 'rgba(244,239,230,0.35)' }}>Status</p>
              <p className="font-sans text-sm" style={{ color: 'var(--bronze)' }}>Completed</p>
            </div>
            <div>
              <p className="label-sm mb-1" style={{ color: 'rgba(244,239,230,0.35)' }}>Photos</p>
              <p className="font-sans text-sm text-cream">{project.images.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo gallery ─────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--warm-white)' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {project.images.map((img, i) => (
              <div key={img} className="relative bg-cream overflow-hidden" style={{ aspectRatio: '4/3' }}>
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

      {/* ── Navigation ────────────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: 'var(--charcoal)' }}>
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="bronze-rule mb-4" />
              <h2 className="text-display-md text-cream mb-2">Explore more projects.</h2>
              <p className="font-sans text-sm" style={{ color: 'rgba(244,239,230,0.45)' }}>
                Browse our full portfolio of completed developments.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/completed-projects" className="btn-primary">All Completed</Link>
              <Link
                href="/current-projects"
                className="font-sans text-xs px-6 py-3 transition-colors"
                style={{ border: '1px solid rgba(244,239,230,0.2)', color: 'rgba(244,239,230,0.6)', letterSpacing: '0.12em' }}
              >
                CURRENT PROJECTS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
