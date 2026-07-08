import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Our Mission — Mission Properties',
  description:
    'Mission Properties specializes in bespoke multifamily development of 100+ units across the Southeastern US, with nearly 14,000 units and $2B+ in projects completed.',
}

const markets = ['Charlotte', 'Raleigh', 'Asheville', 'Hickory', 'Rock Hill', 'Charleston']

const capabilities = [
  {
    label: 'Scale',
    title: 'Boutique to Institutional',
    body: 'We engage projects across the full spectrum — from carefully crafted boutique communities to large institutional-scale developments exceeding hundreds of units.',
  },
  {
    label: 'Geography',
    title: 'Urban to Suburban',
    body: 'From infill urban sites in Charlotte\'s South End to suburban garden communities across the Southeast, our expertise spans diverse market contexts.',
  },
  {
    label: 'Product Type',
    title: 'Full Flexibility',
    body: 'Garden-style, high-density, mixed-use rental, and everything in between. We evaluate the right product type for each unique opportunity.',
  },
  {
    label: 'Scale Threshold',
    title: '100+ Units',
    body: 'Our focus on developments of 100 or more units allows us to bring institutional-quality processes to every project while maintaining a personal, bespoke approach.',
  },
]

export default function AboutPage() {
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
            <p className="label-md" style={{ color: 'rgba(244,239,230,0.4)' }}>About Us</p>
          </div>
          <h1 className="text-display-lg text-cream mb-4">Our Mission</h1>
          <p
            className="font-display font-light"
            style={{ fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', color: 'rgba(244,239,230,0.5)', maxWidth: '40ch' }}
          >
            Persistence and ambition, delivered with a bespoke approach
          </p>
        </div>
      </section>

      {/* ── Mission body ──────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-start">
            <ScrollReveal>
              <div className="bronze-rule mb-6" />
              <p className="label-md mb-5">Who We Are</p>
              <h2 className="text-display-md mb-8">
                Built on persistence.<br />Driven by ambition.
              </h2>
              <div className="font-sans text-base leading-relaxed space-y-5" style={{ color: 'var(--warm-gray)' }}>
                <p>
                  Mission Properties, LLC is a Charlotte-based real estate development firm
                  specializing in{' '}
                  <em className="font-display" style={{ fontStyle: 'italic', fontSize: '1.05em', color: 'var(--charcoal)' }}>bespoke</em>{' '}
                  multifamily housing. Since our inception, the persistence and ambition of our
                  people has resulted in nearly{' '}
                  <strong style={{ color: 'var(--charcoal)' }}>14,000 units</strong> as well as
                  over{' '}
                  <strong style={{ color: 'var(--charcoal)' }}>$2 billion</strong> in projects
                  completed and under construction.
                </p>
                <p>
                  Our depth of experience spans the full development lifecycle — from site
                  identification and entitlement through construction management and lease-up.
                  We bring institutional-quality discipline to every engagement while maintaining
                  the personal attention and creative flexibility that defines a bespoke process.
                </p>
                <p>
                  We evaluate opportunities with 100 or more units across the Southeastern
                  United States, with flexibility across product types including garden-style
                  communities, high-density urban projects, and rental opportunities of all
                  configurations.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats sidebar */}
            <ScrollReveal delay={150}>
              <div className="space-y-0">
                {[
                  { value: '~14,000', label: 'Units Developed', sub: 'Completed & Under Construction' },
                  { value: '$2B+', label: 'Total Project Value', sub: 'Completed & Under Construction' },
                  { value: '40+', label: 'Projects Completed', sub: 'Across the Southeast' },
                  { value: '$1B+', label: 'Rental Unit Portfolio', sub: '5,000+ Rental Units' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between py-6"
                    style={{ borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}
                  >
                    <div>
                      <p className="label-sm mb-1">{stat.label}</p>
                      <p className="font-sans text-xs" style={{ color: 'var(--warm-gray)' }}>{stat.sub}</p>
                    </div>
                    <div className="font-display font-light text-charcoal text-right" style={{ fontSize: '2.25rem', lineHeight: 1 }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Markets */}
              <div className="mt-10 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="label-md mb-4">Markets We Serve</p>
                <div className="flex flex-wrap gap-2">
                  {markets.map((m) => (
                    <span
                      key={m}
                      className="font-sans text-xs px-3 py-1.5"
                      style={{ border: '1px solid var(--border)', color: 'var(--warm-gray)' }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--warm-white)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="mb-12">
              <div className="bronze-rule mb-4" />
              <p className="label-md mb-3">Our Approach</p>
              <h2 className="text-display-md">Development Capabilities</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} delay={i * 80} className="h-full">
                <div className="bg-warm-white p-8 md:p-10 h-full">
                  <p className="label-sm mb-3" style={{ color: 'var(--bronze)' }}>{cap.label}</p>
                  <h3 className="font-display font-light text-charcoal mb-3" style={{ fontSize: '1.6rem' }}>
                    {cap.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                    {cap.body}
                  </p>
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
                <h2 className="text-display-md mb-3">Meet the team behind the mission.</h2>
                <p className="font-sans text-base" style={{ color: 'var(--warm-gray)' }}>
                  Five decades of combined experience in development, capital markets, and construction.
                </p>
              </div>
              <Link href="/team" className="btn-primary shrink-0">Meet Our Team</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
