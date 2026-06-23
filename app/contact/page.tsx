'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
            <p className="label-md" style={{ color: 'rgba(244,239,230,0.4)' }}>Get in Touch</p>
          </div>
          <h1 className="text-display-lg text-cream mb-4">Contact Us</h1>
          <p
            className="font-sans text-base"
            style={{ color: 'rgba(244,239,230,0.5)', maxWidth: '48ch' }}
          >
            Interested in a development opportunity or looking to connect with the Mission
            Properties team? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

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
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="bronze-rule mx-auto mb-6" />
                  <h2 className="font-display font-light text-charcoal mb-3" style={{ fontSize: '2rem' }}>
                    Thank you.
                  </h2>
                  <p className="font-sans text-base" style={{ color: 'var(--warm-gray)', maxWidth: '38ch' }}>
                    We&apos;ve received your message and will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p className="label-md mb-8">Send a Message</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div>
                      <label className="label-sm block mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="label-sm block mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="label-sm block mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="(000) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="label-sm block mb-2">Company / Organization</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your organization"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="label-sm block mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-input"
                        style={{ appearance: 'none', cursor: 'pointer' }}
                      >
                        <option value="">Select a subject</option>
                        <option>Development Opportunity</option>
                        <option>Investment Inquiry</option>
                        <option>General Information</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="label-sm block mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <button type="submit" className="btn-primary">
                      Send Message
                    </button>
                  </div>
                </form>
              )}
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
