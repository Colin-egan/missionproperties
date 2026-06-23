import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Our Team — Mission Properties',
  description:
    'Meet the Mission Properties team: Jason McArthur, Jordan McCarley, Tom Egan, Tara Bechstein, and Jennifer McArthur — decades of combined expertise in multifamily development.',
}

const team = [
  {
    name: 'Jason McArthur',
    title: 'Founder / Principal',
    photo: '/images/team/jason-mcarthur.webp',
    initials: 'JM',
    bio: [
      'Jason brings over 30 years of multifamily development experience across the Southeastern United States, with more than $2.5 billion in apartment projects developed throughout his career.',
      'He began his career at Gables Residential Trust before founding the South Florida division of Wood Partners, growing the division from a one-man operation to a team of more than 20 professionals.',
      'Jason returned to the Carolinas in 2007 and founded Mission Properties, which has since completed 40+ projects comprising over 5,000 rental units valued at more than $1 billion.',
    ],
    education: [
      'B.A. — University of North Carolina at Chapel Hill',
      'MBA — UNC Kenan-Flagler Business School',
    ],
    personal: 'Resides in Charlotte with his wife Jennifer and their five children.',
  },
  {
    name: 'Jordan McCarley',
    title: 'Principal',
    photo: '/images/team/jordan-mccarley.webp',
    initials: 'JC',
    bio: [
      'Jordan brings 16+ years of multifamily capital markets expertise to Mission Properties, with deep relationships across equity, debt, and brokerage circles throughout the Southeast.',
      'He began his career in 2005 at Southeast Apartment Partners in Atlanta before expanding to the Carolinas market in 2007. He was named partner in 2011 when the firm became Multi Housing Advisors.',
      'Jordan served in leadership at Cushman & Wakefield, departing in 2021 as Executive Vice Chair of Capital Markets. Over his career, he has been involved in 700 transactions totaling more than $20 billion in sales volume.',
    ],
    education: [
      'BBA, Risk Management — University of Georgia',
    ],
    personal: 'Lives in Charlotte with his wife Ellen and their three sons.',
  },
  {
    name: 'Tom Egan',
    title: 'Development Manager',
    photo: '/images/team/tom-egan.webp',
    initials: 'TE',
    bio: [
      'Tom has spent 8+ years with Mission Properties, overseeing 20 projects representing approximately 2,500 units and $425 million in total project value.',
      'His role spans all phases of project execution — managing schedules, billing, and consultant teams from pre-development through delivery. He previously worked at David Furman Architecture and Andrew Roby General Contractors, giving him a uniquely holistic view of the development process.',
      'Tom has served as Chairperson of both the Charlotte Historic District Commission and the Charlotte-Mecklenburg Historic Landmarks Commission.',
    ],
    education: [
      'B.A., Architectural Design — Clemson University',
    ],
    personal: 'Resides in Wilmington, NC with his wife Nancy and three children.',
  },
  {
    name: 'Tara Bechstein',
    title: 'Accounting',
    photo: '/images/team/tara-bechstein.webp',
    initials: 'TB',
    bio: [
      'Tara brings 17+ years of public accounting experience to Mission Properties, where she has served since April 2021.',
      'She began her career at Grant Thornton in Charlotte before joining a local accounting firm, developing deep expertise in real estate and construction accounting.',
    ],
    education: [
      'B.S., Business Administration (Accounting) — Bowling Green State University',
      'Masters of Accountancy — Bowling Green State University',
      'Licensed CPA — State of North Carolina',
    ],
    personal: 'Originally from Ohio; resides in Charlotte with her husband Drew and two sons.',
  },
  {
    name: 'Jennifer McArthur',
    title: 'Administrative / Accounting',
    photo: '/images/team/jennifer-mcarthur.webp',
    initials: 'JM2',
    bio: [
      'Jennifer has provided administrative and accounting services to Mission Properties since 2013, playing a foundational role in the firm\'s back-office operations.',
      'Prior to Mission Properties, she gained experience in fundraising at Brookstone Schools and Duke University, as well as roles in human resources and IT.',
    ],
    education: [
      'B.A., Political Science — Vanderbilt University (1995)',
    ],
    personal: 'Married to founder Jason McArthur since 1998; mother of five.',
  },
]

export default function TeamPage() {
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
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        sizes="220px"
                      />
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
