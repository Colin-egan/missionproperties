import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Completed Projects — Mission Properties',
  description:
    'Mission Properties has delivered 40+ multifamily developments comprising over 5,000 rental units valued at more than $1 billion across the Southeastern United States.',
}

const projects = [
  { name: 'Crescent Dilworth', location: 'Charlotte, NC', units: 220, type: 'Urban Mid-Rise', year: '2022', cls: 'proj-img-1' },
  { name: 'Arden Park North', location: 'Charlotte, NC', units: 312, type: 'Garden-Style', year: '2021', cls: 'proj-img-2' },
  { name: 'Broadstone South End', location: 'Charlotte, NC', units: 285, type: 'Mixed Use', year: '2021', cls: 'proj-img-3' },
  { name: 'The Residences at Waverly', location: 'Charlotte, NC', units: 195, type: 'Garden-Style', year: '2020', cls: 'proj-img-4' },
  { name: 'Overture Northlake', location: 'Charlotte, NC', units: 248, type: 'Active Adult', year: '2020', cls: 'proj-img-5' },
  { name: 'Indigo Creek', location: 'Hickory, NC', units: 180, type: 'Garden-Style', year: '2019', cls: 'proj-img-6' },
  { name: 'Catalyst Apartments', location: 'Raleigh, NC', units: 210, type: 'Urban Infill', year: '2019', cls: 'proj-img-1' },
  { name: 'Summit at Carolina Place', location: 'Pineville, NC', units: 334, type: 'Garden-Style', year: '2018', cls: 'proj-img-2' },
  { name: 'Novare Southpark', location: 'Charlotte, NC', units: 162, type: 'Boutique High-Rise', year: '2018', cls: 'proj-img-3' },
  { name: 'Magnolia Pointe', location: 'Rock Hill, SC', units: 240, type: 'Garden-Style', year: '2017', cls: 'proj-img-4' },
  { name: 'The Ashford', location: 'Asheville, NC', units: 128, type: 'Boutique Multifamily', year: '2017', cls: 'proj-img-5' },
  { name: 'Palmetto Commons', location: 'Charleston, SC', units: 188, type: 'Mid-Rise', year: '2016', cls: 'proj-img-6' },
]

export default function CompletedProjectsPage() {
  const totalUnits = projects.reduce((sum, p) => sum + p.units, 0)

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
          <h1 className="text-display-lg text-cream mb-4">Completed Projects</h1>
          <p
            className="font-sans text-base"
            style={{ color: 'rgba(244,239,230,0.5)', maxWidth: '52ch' }}
          >
            Over 40 developments delivered across the Southeastern United States — from boutique
            communities to institutional-scale garden and mixed-use properties.
          </p>
        </div>
      </section>

      {/* ── Legacy stats bar ──────────────────────────────────── */}
      <section className="py-8" style={{ background: 'var(--warm-white)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '40+', label: 'Completed Projects' },
              { value: '5,000+', label: 'Rental Units Delivered' },
              { value: '$1B+', label: 'Portfolio Value' },
              { value: '6+', label: 'Markets Served' },
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

      {/* ── Projects list ─────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          {/* Table header */}
          <div
            className="hidden md:grid grid-cols-12 gap-4 pb-4 mb-2"
            style={{ borderBottom: '2px solid var(--charcoal)' }}
          >
            <div className="col-span-5 label-md">Project</div>
            <div className="col-span-3 label-md">Location</div>
            <div className="col-span-2 label-md">Units</div>
            <div className="col-span-1 label-md">Year</div>
            <div className="col-span-1 label-md">Type</div>
          </div>

          {/* Table rows */}
          <div>
            {projects.map((proj, i) => (
              <ScrollReveal key={proj.name} delay={i * 40}>
                <div
                  className="project-row group py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center transition-colors"
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'default' }}
                >
                  <div className="md:col-span-5">
                    <h3 className="font-display font-light text-charcoal transition-colors" style={{ fontSize: '1.3rem', lineHeight: 1.2 }}>
                      {proj.name}
                    </h3>
                    <p className="label-sm mt-1 md:hidden" style={{ color: 'var(--warm-gray)' }}>
                      {proj.location} · {proj.units} units · {proj.year}
                    </p>
                  </div>
                  <div className="col-span-3 hidden md:block">
                    <p className="font-sans text-sm" style={{ color: 'var(--warm-gray)' }}>{proj.location}</p>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <p className="font-sans text-sm text-charcoal font-medium">{proj.units}</p>
                  </div>
                  <div className="col-span-1 hidden md:block">
                    <p className="font-sans text-sm" style={{ color: 'var(--warm-gray)' }}>{proj.year}</p>
                  </div>
                  <div className="col-span-1 hidden md:block">
                    <span
                      className="font-sans text-xs px-2 py-1"
                      style={{ background: 'var(--cream)', color: 'var(--warm-gray)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
                    >
                      {proj.type.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Note */}
          <ScrollReveal>
            <p className="font-sans text-xs mt-8" style={{ color: 'var(--warm-gray)', fontStyle: 'italic' }}>
              Partial listing shown. Mission Properties has completed 40+ developments comprising over 5,000 units.
              Contact us for the full portfolio.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Visual grid ───────────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: 'var(--warm-white)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="bronze-rule mb-4" />
            <p className="label-md mb-8">Portfolio Snapshot</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'var(--border)' }}>
            {projects.slice(0, 4).map((proj, i) => (
              <ScrollReveal key={`thumb-${proj.name}`} delay={i * 60}>
                <div className={`${proj.cls} aspect-square relative`}>
                  <div className="absolute inset-0" style={{ background: 'rgba(26,23,20,0.4)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-display font-light text-cream" style={{ fontSize: '0.95rem', lineHeight: 1.2 }}>
                      {proj.name}
                    </h4>
                    <p className="label-sm mt-0.5" style={{ color: 'rgba(244,239,230,0.45)' }}>
                      {proj.units} Units
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-pad">
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
