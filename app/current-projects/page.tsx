import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Current Projects — Mission Properties',
  description:
    'Explore Mission Properties\' current multifamily developments across Charlotte, Raleigh, Asheville, and the greater Southeast.',
}

const projects = [
  {
    name: 'South End Residences',
    location: 'Charlotte, NC',
    neighborhood: 'South End',
    units: 214,
    type: 'High-Density Mixed Use',
    status: 'Under Construction',
    description:
      'A high-density urban multifamily development in Charlotte\'s rapidly growing South End corridor, featuring ground-floor retail and premium amenity spaces.',
    cls: 'proj-img-1',
  },
  {
    name: 'River District Commons',
    location: 'Charlotte, NC',
    neighborhood: 'River District',
    units: 312,
    type: 'Garden-Style',
    status: 'Under Construction',
    description:
      'A large-scale garden-style community in the master-planned River District, offering suburban living with urban connectivity along the Catawba River.',
    cls: 'proj-img-2',
  },
  {
    name: 'Raleigh Station',
    location: 'Raleigh, NC',
    neighborhood: 'Downtown Core',
    units: 186,
    type: 'Urban Multifamily',
    status: 'Pre-Development',
    description:
      'An urban infill development adjacent to Raleigh\'s transit corridor, positioned to capture demand from the city\'s rapidly growing tech-driven workforce.',
    cls: 'proj-img-3',
  },
  {
    name: 'Asheville Highlands',
    location: 'Asheville, NC',
    neighborhood: 'West Asheville',
    units: 152,
    type: 'Boutique Multifamily',
    status: 'Pre-Development',
    description:
      'A boutique multifamily development in West Asheville, designed to complement the neighborhood\'s distinctive character while meeting strong pent-up rental demand.',
    cls: 'proj-img-4',
  },
  {
    name: 'Charleston Peninsula',
    location: 'Charleston, SC',
    neighborhood: 'Upper Peninsula',
    units: 228,
    type: 'Mid-Rise',
    status: 'Under Construction',
    description:
      'A mid-rise development on Charleston\'s Upper Peninsula capturing the market\'s exceptional demand fundamentals, with rooftop amenities and covered parking.',
    cls: 'proj-img-5',
  },
  {
    name: 'Rock Hill Gateway',
    location: 'Rock Hill, SC',
    neighborhood: 'Downtown Adjacent',
    units: 178,
    type: 'Garden-Style',
    status: 'Pre-Development',
    description:
      'A garden-style community positioned to serve Rock Hill\'s growing workforce as the metro Charlotte footprint continues its southern expansion.',
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
            Active developments across Charlotte, Raleigh, Asheville, Charleston, and Rock Hill.
          </p>
        </div>
      </section>

      {/* ── Filter tags ───────────────────────────────────────── */}
      <section className="py-6" style={{ background: 'var(--warm-white)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-sm mr-2">Filter:</span>
            {['All', 'Under Construction', 'Pre-Development', 'Charlotte', 'Raleigh', 'Asheville', 'Charleston'].map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs px-3 py-1.5 cursor-pointer transition-colors"
                style={{
                  border: '1px solid var(--border)',
                  color: tag === 'All' ? 'var(--cream)' : 'var(--warm-gray)',
                  background: tag === 'All' ? 'var(--charcoal)' : 'transparent',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects grid ─────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {projects.map((proj, i) => (
              <ScrollReveal key={proj.name} delay={i * 80}>
                <div className="project-card bg-warm-white flex flex-col h-full">
                  {/* Image */}
                  <div className={`project-card-img ${proj.cls}`} style={{ height: '220px', position: 'relative' }}>
                    <div className="absolute inset-0" style={{ background: 'rgba(26,23,20,0.3)' }} />
                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="font-sans text-xs px-2.5 py-1"
                        style={{ background: 'rgba(26,23,20,0.7)', color: statusColors[proj.status] || 'var(--cream)', letterSpacing: '0.12em' }}
                      >
                        {proj.status}
                      </span>
                    </div>
                    {/* Unit count */}
                    <div className="absolute bottom-4 right-4">
                      <span className="font-display font-light text-cream" style={{ fontSize: '1.75rem' }}>
                        {proj.units}
                      </span>
                      <span className="label-sm block text-right" style={{ color: 'rgba(244,239,230,0.5)' }}>units</span>
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
          <div className="grid grid-cols-3 divide-x" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {[
              { value: `${projects.length}`, label: 'Active Developments' },
              { value: `${projects.reduce((a, b) => a + b.units, 0).toLocaleString()}`, label: 'Units In Progress' },
              { value: '6', label: 'Southeast Markets' },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6">
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
