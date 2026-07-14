import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getCompletedProjects } from '@/lib/completed-projects'
import ProjectTabs from '@/components/ProjectTabs'

export async function generateStaticParams() {
  const completedProjects = await getCompletedProjects()
  return completedProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const completedProjects = await getCompletedProjects()
  const project = completedProjects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Mission Properties`,
    description:
      project.description ||
      `${project.name} — a completed multifamily development by Mission Properties in ${project.location}.`,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const completedProjects = await getCompletedProjects()
  const project = completedProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  const heroSrc = project.heroImage

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-charcoal" style={{ height: 'clamp(360px, 55vh, 640px)' }}>
        {heroSrc && (
          <Image
            src={heroSrc}
            alt={project.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(26,23,20,0.35) 0%, rgba(26,23,20,0.65) 100%)' }}
        />
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

      {/* ── Tabs: Overview + Gallery ──────────────────────────── */}
      <ProjectTabs project={project} />

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
                style={{
                  border: '1px solid rgba(244,239,230,0.2)',
                  color: 'rgba(244,239,230,0.6)',
                  letterSpacing: '0.12em',
                }}
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
