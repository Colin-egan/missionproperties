import ScrollReveal from '@/components/ScrollReveal'
import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import { getHeaderImage } from '@/lib/completed-projects'

export const metadata = {
  title: 'Contact — Mission Properties',
  description:
    'Get in touch with Mission Properties to discuss a development opportunity or connect with the team.',
}

export default async function ContactPage() {
  const headerImage = await getHeaderImage()

  return (
    <>
      {/* ── Page header ───────────────────────────────────────── */}
      <PageHeader eyebrow="Get in Touch" title="Contact Us" headerImage={headerImage}>
        <p
          className="font-sans text-base"
          style={{ color: 'rgba(244,239,230,0.5)', maxWidth: '48ch' }}
        >
          Interested in a development opportunity or looking to connect with the Mission
          Properties team? We&apos;d love to hear from you.
        </p>
      </PageHeader>

      {/* ── Contact body ──────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-20">
            {/* Left: Contact info */}
            <ScrollReveal className="md:col-span-2">
              <div>
                <div className="bronze-rule mb-6" />
                <p className="label-md mb-8">Our Office</p>

                {/* Address */}
                <div className="mb-8">
                  <p className="label-sm mb-3">Address</p>
                  <address className="not-italic font-sans text-base leading-relaxed text-charcoal">
                    5800 Old Pineville Road<br />
                    Suite 201<br />
                    Charlotte, NC 28217
                  </address>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <p className="label-sm mb-3">Phone</p>
                  <a
                    href="tel:9809202200"
                    className="font-display font-light text-charcoal transition-colors hover:text-bronze"
                    style={{ fontSize: '1.5rem' }}
                  >
                    (980) 920-2200
                  </a>
                </div>

                {/* Email */}
                <div className="mb-10">
                  <p className="label-sm mb-3">Email</p>
                  <a
                    href="mailto:info@missionprop.com"
                    className="font-sans text-base text-charcoal transition-colors hover:text-bronze"
                  >
                    info@missionprop.com
                  </a>
                </div>

                {/* Divider */}
                <div className="bronze-rule-full mb-8" />

                {/* Markets */}
                <div>
                  <p className="label-sm mb-4">Markets We Serve</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Charlotte, NC', 'Raleigh, NC', 'Asheville, NC', 'Hickory, NC', 'Rock Hill, SC', 'Charleston, SC'].map((m) => (
                      <span key={m} className="font-sans text-xs" style={{ color: 'var(--warm-gray)' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Form */}
            <ScrollReveal className="md:col-span-3" delay={150}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ───────────────────────────────────── */}
      <section style={{ height: '280px', background: 'var(--charcoal)', position: 'relative' }}>
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="label-md mb-2" style={{ color: 'rgba(244,239,230,0.35)' }}>Charlotte, NC</p>
          <p className="font-display font-light text-cream" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>
            5800 Old Pineville Road, Suite 201
          </p>
          <p className="label-sm mt-2" style={{ color: 'rgba(244,239,230,0.35)' }}>Charlotte, NC 28217</p>
          <a
            href="https://maps.google.com/?q=5800+Old+Pineville+Road+Suite+201+Charlotte+NC+28217"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-bronze mt-6"
            style={{ padding: '0.6rem 1.5rem' }}
          >
            Get Directions
          </a>
        </div>
      </section>
    </>
  )
}
