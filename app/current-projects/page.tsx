import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Current Projects — Mission Properties',
  description:
    'Explore Mission Properties\' current multifamily developments across the Carolinas and greater Southeast.',
}

const projects = [
  {
    name: 'Evermore',
    slug: 'evermore',
    location: 'Mooresville, NC',
    neighborhood: 'Mooresville',
    units: 216,
    type: 'Multifamily',
    status: 'Under Construction',
    description:
      'A 216-unit multifamily development in Mooresville, NC, offering modern residential living in one of the Lake Norman region\'s fastest-growing communities.',
    cls: 'proj-img-1',
  },
  {
    name: 'The Venue on S. Main',
    slug: 'venue-on-s-main',
    location: 'Cornelius, NC',
    neighborhood: 'Cornelius',
    units: 73,
    type: 'Mixed Use',
    status: 'Under Construction',
    description:
      'Comprised of 73 residential units alongside an independent commercial building, The Venue on S. Main brings a vibrant mixed-use presence to the heart of Cornelius.',
    cls: 'proj-img-2',
  },
  {
    name: 'Bowery West',
    slug: 'bowery-west',
    location: 'Charlotte, NC',
    neighborhood: 'West Charlotte',
    units: 213,
    type: 'Townhomes & Apartments',
    status: 'Under Construction',
    description:
      'A 213-unit development of townhomes and apartments with resort-style amenities, ideally positioned just outside Uptown Charlotte with outstanding connectivity.',
    cls: 'proj-img-3',
  },
  {
    name: 'Christenbury Apartments',
    slug: 'christenbury',
    location: 'Concord, NC',
    neighborhood: 'Concord',
    units: 156,
    type: 'Mixed Use',
    status: 'Under Construction',
    description:
      'A large multi-use development in Concord featuring 156 residential units alongside mixed-use commercial space, designed to serve the growing Cabarrus County market.',
    cls: 'proj-img-4',
  },
  {
    name: 'Halcyon',
    slug: 'halcyon',
    location: 'Charleston, SC',
    neighborhood: 'Daniel Island',
    units: 204,
    type: 'Multifamily',
    status: 'Under Construction',
    description:
      'Set on Daniel Island, Halcyon consists of 204 units across 7 residential buildings and a dedicated clubhouse, complete with outdoor amenity spaces.',
    cls: 'proj-img-5',
  },
  {
    name: 'Hamilton Reserve',
    slug: 'hamilton-reserve',
    location: 'Greensboro, NC',
    neighborhood: 'Greensboro',
    units: 0,
    type: 'Multifamily',
    status: 'Under Construction',
    description:
      'A 6-building community in Greensboro featuring five residential buildings and a dedicated clubhouse with both indoor and outdoor amenity spaces.',
    cls: 'proj-img-6',
  },
]

const statusColors: Record<string, string> = {
  'Under Construction': 'var(--bronze)',
  'Pre-Development': 'var(--warm-gray)',
}

export default function CurrentProjectsPage() {
  return (
    <>
      {/* ── Page header ───────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 md:pt-44 md:pb-28"
        style={{ background: 'var(--charcoal)' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(244,239,230,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(244,239,230,0.8) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="container-site relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bronze-rule" />
            <p className="label-md" style={{ color: 'rgba(244,239,230,0.4)' }}>Portfolio</p>
          </div>
          <h1 className="text-display-lg text-cream mb-4">Current Projects</h1>
          <p
            className="font-sans text-base"
            style={{ color: 'rgba(244,239,230,0.5)', maxWidth: '52ch' }}
          >
            Active developments across Mooresville, Cornelius, Charlotte, Concord, Greensboro, and Charleston.
          </p>
        </div>
      </section>

      {/* ── Projects grid ─────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {projects.map((proj, i) => (
              <ScrollReveal key={proj.name} delay={i * 80}>
                <div id={proj.slug} className="project-card bg-warm-white flex flex-col h-full">
                  {/* Image */}
                  <div className={`project-card-img ${proj.cls}`} style={{ height: '220px', position: 'relative' }}>
                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="font-sans text-xs px-2.5 py-1"
                        style={{ background: 'rgba(26,23,20,0.7)', color: statusColors[proj.status] || 'var(--cream)', letterSpacing: '0.12em' }}
                      >
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="label-sm mb-2" style={{ color: 'var(--bronze)' }}>{proj.type}</p>
                    <h3 className="font-display font-light text-charcoal mb-1" style={{ fontSize: '1.4rem' }}>
                      {proj.name}
                    </h3>
                    <p className="font-sans text-xs mb-4" style={{ color: 'var(--warm-gray)' }}>
                      {proj.neighborhood} · {proj.location}
                    </p>
                    <p className="font-sans text-sm leading-relaxed flex-1" style={{ color: 'var(--warm-gray)' }}>
                      {proj.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Summary stats ─────────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: 'var(--charcoal)' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {([
              { value: `${projects.length}`, label: 'Active Developments' },
              { value: `${projects.reduce((a, b) => a + b.units, 0).toLocaleString()}+`, label: 'Units In Progress' },
              { value: '6', label: 'Southeast Markets' },
            ] as const).map((stat, i) => (
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
