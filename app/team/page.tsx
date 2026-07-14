import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { getTeamMembers } from '@/lib/team'

export const metadata = {
  title: 'Our Team — Mission Properties',
  description:
    'Meet the Mission Properties team: Jason McArthur, Tom Egan, Tara Bechstein, and Jennifer McArthur — decades of combined expertise in multifamily development.',
}

export default async function TeamPage() {
  const team = await getTeamMembers()

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
          <h1 className="text-display-lg text-cream mb-4">Our Team</h1>
          <p
            className="font-display font-light"
            style={{ fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', color: 'rgba(244,239,230,0.5)', maxWidth: '40ch' }}
          >
            Decades of combined expertise in development, capital markets & construction
          </p>
        </div>
      </section>

      {/* ── Team members ──────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="space-y-0">
            {team.map((member, idx) => (
              <ScrollReveal key={member.name}>
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-14 md:py-16"
                  style={{ borderBottom: idx < team.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  {/* Left: identity */}
                  <div className="md:col-span-3">
                    {/* Photo */}
                    <div
                      className="mb-5 overflow-hidden"
                      style={{
                        width: '100%',
                        maxWidth: '220px',
                        aspectRatio: '4/5',
                        position: 'relative',
                      }}
                    >
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'top' }}
                          sizes="220px"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ background: 'var(--charcoal)' }}
                        >
                          <span className="font-display font-light text-cream" style={{ fontSize: '2.5rem' }}>
                            {member.initials}
                          </span>
                        </div>
                      )}
                    </div>
                    <h2 className="font-display font-light text-charcoal mb-1" style={{ fontSize: '1.75rem', lineHeight: 1.1 }}>
                      {member.name}
                    </h2>
                    <p className="label-sm" style={{ color: 'var(--bronze)' }}>{member.title}</p>
                  </div>

                  {/* Center: bio */}
                  <div className="md:col-span-6">
                    <div className="space-y-4 mb-6">
                      {member.bio.map((para, i) => (
                        <p key={i} className="font-sans text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                          {para}
                        </p>
                      ))}
                    </div>
                    <p className="font-sans text-sm italic" style={{ color: 'var(--warm-gray)', opacity: 0.7 }}>
                      {member.personal}
                    </p>
                  </div>

                  {/* Right: education */}
                  <div className="md:col-span-3">
                    <p className="label-sm mb-3" style={{ color: 'var(--warm-gray)' }}>Education</p>
                    <div className="space-y-2">
                      {member.education.map((edu) => (
                        <p key={edu} className="font-sans text-xs leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                          {edu}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: 'var(--warm-white)' }}>
        <div className="container-site">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="bronze-rule mb-4" />
                <h2 className="text-display-md mb-2">Work with our team.</h2>
                <p className="font-sans text-base" style={{ color: 'var(--warm-gray)' }}>
                  Discuss your next development opportunity with Mission Properties.
                </p>
              </div>
              <Link href="/contact" className="btn-primary shrink-0">Contact Us</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
