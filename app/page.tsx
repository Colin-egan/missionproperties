import Link from 'next/link'
import Image from 'next/image'
import StatCounter from '@/components/StatCounter'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        {/* Background property photo */}
        <Image
          src="/images/current-projects/bowerywest.webp"
          alt="Bowery West, a Mission Properties multifamily development in Charlotte, NC"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: '50% 40%' }}
          sizes="100vw"
        />

        {/* Dark overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,23,20,0.92) 0%, rgba(26,23,20,0.55) 50%, rgba(26,23,20,0.35) 100%)',
          }}
        />

        {/* Content */}
        <div className="container-site relative z-10 pb-16 md:pb-24 pt-32 md:-ml-10 lg:-ml-24">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-10">
              <div className="bronze-rule" />
              <p className="label-md" style={{ color: 'rgba(244,239,230,0.5)' }}>
                Charlotte, NC — Est. Since Inception
              </p>
            </div>

            {/* Main heading */}
            <h1 className="text-display-xl text-cream mb-6">
              Mission
              <br />
              Properties
            </h1>

            {/* Tagline */}
            <p
              className="font-display font-light"
              style={{
                fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 3.5vw, 3rem)',
                color: 'rgba(244,239,230,0.65)',
                lineHeight: 1.2,
                maxWidth: '28ch',
              }}
            >
              bespoke multifamily development
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Link href="/current-projects" className="btn-outline-bronze">
                View Our Projects
              </Link>
              <Link href="/about" className="btn-outline" style={{ borderColor: 'rgba(244,239,230,0.3)', color: 'rgba(244,239,230,0.7)' }}>
                Our Mission
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-0 right-0 pb-8 pr-8 hidden md:flex flex-col items-center gap-2">
            <p className="label-sm" style={{ color: 'rgba(244,239,230,0.3)', writingMode: 'vertical-rl' }}>
              Scroll
            </p>
            <div style={{ width: 1, height: '3rem', background: 'rgba(244,239,230,0.15)' }} />
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="section-pad bg-warm-white">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <StatCounter
              end={14000}
              suffix="+"
              label="Units Developed"
              sublabel="Completed & Under Construction"
            />
            <StatCounter
              end={2}
              prefix="$"
              suffix="B+"
              label="Total Project Value"
              sublabel="Completed & Under Construction"
            />
            <StatCounter
              end={40}
              suffix="+"
              label="Projects Completed"
              sublabel="Across the Southeast"
            />
            <StatCounter
              end={1}
              prefix="$"
              suffix="B+"
              label="Rental Unit Value"
              sublabel="5,000+ Units"
            />
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="container-site">
        <div className="bronze-rule-full" />
      </div>

      {/* ── About teaser ──────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Text */}
            <ScrollReveal>
              <div className="bronze-rule mb-6" />
              <p className="label-md mb-4">About Us</p>
              <h2 className="text-display-lg mb-6">
                From Boutique<br />to Institutional
              </h2>
              <p className="font-sans text-base leading-relaxed mb-4" style={{ color: 'var(--warm-gray)', maxWidth: '48ch' }}>
                Since its inception, the persistence and ambition of the people at Mission
                Properties has resulted in nearly{' '}
                <strong style={{ color: 'var(--charcoal)' }}>14,000 units</strong> as well as
                over <strong style={{ color: 'var(--charcoal)' }}>$2 billion</strong> in projects
                completed and under construction.
              </p>
              <p className="font-sans text-base leading-relaxed mb-8" style={{ color: 'var(--warm-gray)', maxWidth: '48ch' }}>
                We specialize in{' '}
                <em className="font-display" style={{ fontStyle: 'italic', fontSize: '1.1em', color: 'var(--charcoal)' }}>bespoke</em>{' '}
                multifamily developments of 100+ units across the Southeastern United States —
                from garden-style communities to high-density urban living.
              </p>
              <Link href="/about" className="btn-primary">Learn More</Link>
            </ScrollReveal>

            {/* Visual block */}
            <ScrollReveal delay={150}>
              <div className="relative">
                {/* Primary image block */}
                <div
                  style={{ height: '420px', position: 'relative', overflow: 'hidden' }}
                >
                  <Image
                    src="/images/current-projects/The+Halcyon+Exterior+2.webp"
                    alt="The Halcyon, a Mission Properties multifamily development in Charleston, SC"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'rgba(26,23,20,0.45)' }}
                  />
                  {/* Decorative text overlay */}
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <p className="font-display font-light text-cream/20" style={{ fontSize: '5rem', lineHeight: 1 }}>SE</p>
                      <div className="label-sm" style={{ color: 'rgba(244,239,230,0.35)' }}>
                        Southeast United States
                      </div>
                    </div>
                  </div>
                  {/* Geographic markers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      {['Charlotte', 'Raleigh', 'Asheville', 'Charleston', 'Hickory', 'Rock Hill'].map((city) => (
                        <div key={city} className="px-3 py-1.5" style={{ border: '1px solid rgba(244,239,230,0.12)' }}>
                          <span className="label-sm" style={{ color: 'rgba(244,239,230,0.4)' }}>{city}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating stat card */}
                <div
                  className="absolute -bottom-6 -right-6 bg-bronze p-6 hidden md:block"
                  style={{ minWidth: '180px' }}
                >
                  <div className="font-display font-light text-cream" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                    30+
                  </div>
                  <p className="label-sm mt-2" style={{ color: 'rgba(244,239,230,0.7)' }}>
                    Years of Experience
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Markets ───────────────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: 'var(--warm-white)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="bronze-rule mx-auto mb-4" />
              <p className="label-md">Our Markets</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px" style={{ background: 'var(--border)' }}>
            {[
              { city: 'Charlotte', state: 'NC' },
              { city: 'Raleigh', state: 'NC' },
              { city: 'Asheville', state: 'NC' },
              { city: 'Hickory', state: 'NC' },
              { city: 'Rock Hill', state: 'SC' },
              { city: 'Charleston', state: 'SC' },
            ].map(({ city, state }, i) => (
              <ScrollReveal key={city} delay={i * 60}>
                <div className="bg-warm-white p-6 md:p-8 text-center">
                  <div className="font-display font-light text-charcoal" style={{ fontSize: '1.15rem' }}>
                    {city}
                  </div>
                  <div className="label-sm mt-1">{state}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects teaser ───────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <div className="bronze-rule mb-4" />
                <p className="label-md mb-3">Portfolio</p>
                <h2 className="text-display-lg">Current Projects</h2>
              </div>
              <Link href="/current-projects" className="btn-outline self-start md:self-end">
                View All Projects
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {[
              { name: 'Evermore', slug: 'evermore', location: 'Mooresville, NC', units: '216 Units', type: 'Multifamily', cls: 'proj-img-1' },
              { name: 'The Venue on S. Main', slug: 'venue-on-s-main', location: 'Cornelius, NC', units: '73 Units', type: 'Mixed Use', cls: 'proj-img-2' },
              { name: 'Bowery West', slug: 'bowery-west', location: 'Charlotte, NC', units: '213 Units', type: 'Townhomes & Apartments', cls: 'proj-img-3' },
              { name: 'Christenbury Apartments', slug: 'christenbury', location: 'Concord, NC', units: '156 Units', type: 'Mixed Use', cls: 'proj-img-4' },
              { name: 'Halcyon', slug: 'halcyon', location: 'Charleston, SC', units: '204 Units', type: 'Multifamily', cls: 'proj-img-5' },
              { name: 'Hamilton Reserve', slug: 'hamilton-reserve', location: 'Greensboro, NC', units: '6 Buildings', type: 'Multifamily', cls: 'proj-img-6' },
            ].map((proj, i) => (
              <ScrollReveal key={proj.name} delay={i * 100}>
                <Link href={`/current-projects#${proj.slug}`} className="block">
                  <div className="project-card bg-warm-white">
                    <div className={`project-card-img aspect-[4/3] ${proj.cls} flex items-end p-6`}>
                      <span className="label-sm" style={{ color: 'rgba(244,239,230,0.4)' }}>
                        {proj.units}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="label-sm mb-2">{proj.type}</p>
                      <h3 className="font-display font-light text-xl text-charcoal mb-1">{proj.name}</h3>
                      <p className="font-sans text-sm" style={{ color: 'var(--warm-gray)' }}>{proj.location}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team teaser ───────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--charcoal)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="bronze-rule mx-auto mb-4" />
              <p className="label-md mb-3" style={{ color: 'rgba(244,239,230,0.45)' }}>Leadership</p>
              <h2 className="text-display-lg text-cream">Our Team</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                name: 'Jason McArthur',
                title: 'Founder / Principal',
                highlight: '$2.5B+',
                desc: 'in apartment projects across the Southeast over 30+ years',
                initials: 'JM',
              },
              {
                name: 'Tom Egan',
                title: 'Development Manager',
                highlight: '$425MM+',
                desc: 'in projects overseen across 20 Mission developments',
                initials: 'TE',
              },
            ].map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100}>
                <div className="team-card text-center">
                  {/* Monogram */}
                  <div
                    className="w-20 h-20 mx-auto mb-5 flex items-center justify-center"
                    style={{ border: '1px solid rgba(184,119,58,0.3)', borderRadius: '50%' }}
                  >
                    <span
                      className="font-display font-light"
                      style={{ fontSize: '1.5rem', color: 'var(--bronze-light)' }}
                    >
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-display font-light text-cream" style={{ fontSize: '1.4rem' }}>
                    {member.name}
                  </h3>
                  <p className="label-sm mt-1 mb-4" style={{ color: 'rgba(244,239,230,0.35)' }}>
                    {member.title}
                  </p>
                  <div className="bronze-rule mx-auto mb-4" />
                  <p className="font-display font-light" style={{ color: 'var(--bronze-light)', fontSize: '1.5rem' }}>
                    {member.highlight}
                  </p>
                  <p className="font-sans text-xs mt-1" style={{ color: 'rgba(244,239,230,0.4)', maxWidth: '22ch', margin: '0.25rem auto 0' }}>
                    {member.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/team" className="btn-outline-bronze">Meet the Full Team</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-pad bg-warm-white">
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="bronze-rule mx-auto mb-6" />
              <h2 className="text-display-md mb-5">
                Ready to discuss your next development?
              </h2>
              <p className="font-sans text-base leading-relaxed mb-8" style={{ color: 'var(--warm-gray)' }}>
                From boutique communities to institutional-scale developments, Mission Properties
                brings decades of expertise to every project across the Southeast.
              </p>
              <Link href="/contact" className="btn-primary">Get in Touch</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
