import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import PageHeader from '@/components/PageHeader'
import { getCompletedProjects, getHeaderImage } from '@/lib/completed-projects'

export const metadata = {
  title: 'Completed Projects — Mission Properties',
  description:
    'Mission Properties has delivered multifamily developments comprising thousands of rental units across the Southeastern United States.',
}

export default async function CompletedProjectsPage() {
  const [completedProjects, headerImage] = await Promise.all([getCompletedProjects(), getHeaderImage()])

  return (
    <>
      {/* ── Page header ───────────────────────────────────────── */}
      <PageHeader eyebrow="Portfolio" title="Completed Projects" headerImage={headerImage}>
        <p
          className="font-sans text-base"
          style={{ color: 'rgba(244,239,230,0.5)', maxWidth: '52ch' }}
        >
          {completedProjects.length} developments delivered across the Carolinas and greater Southeast — from
          boutique loft communities to institutional-scale multifamily properties.
        </p>
      </PageHeader>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <section className="py-8" style={{ background: 'var(--warm-white)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { value: `${completedProjects.length}+`, label: 'Completed Projects' },
              { value: '5,000+', label: 'Rental Units Delivered' },
              { value: '$1B+', label: 'Portfolio Value' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-light text-charcoal" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <p className="label-sm mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects photo grid ───────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {completedProjects.map((proj, i) => (
              <ScrollReveal key={proj.slug} delay={i * 40}>
                <Link href={`/completed-projects/${proj.slug}`} className="block group">
                  <div className="bg-warm-white">
                    {/* Image */}
                    <div className="relative overflow-hidden bg-cream" style={{ height: '260px' }}>
                      {proj.heroImage && (
                        <Image
                          src={proj.heroImage}
                          alt={proj.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-charcoal opacity-20 group-hover:opacity-10 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <span
                          className="font-sans text-xs px-2 py-1"
                          style={{ background: 'rgba(26,23,20,0.65)', color: 'rgba(244,239,230,0.7)', letterSpacing: '0.1em', fontSize: '0.6rem' }}
                        >
                          {proj.images.length} PHOTOS
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5" style={{ borderTop: '1px solid var(--border)' }}>
                      <h3
                        className="font-display font-light text-charcoal transition-colors group-hover:text-bronze"
                        style={{ fontSize: '1.25rem', lineHeight: 1.2 }}
                      >
                        {proj.name}
                      </h3>
                      <p className="font-sans text-xs mt-1" style={{ color: 'var(--warm-gray)' }}>
                        {proj.location}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--warm-white)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="bronze-rule mb-4" />
                <h2 className="text-display-md mb-2">See what we&apos;re building next.</h2>
                <p className="font-sans text-base" style={{ color: 'var(--warm-gray)' }}>
                  Explore our active developments across the Southeast.
                </p>
              </div>
              <Link href="/current-projects" className="btn-primary shrink-0">Current Projects</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
