'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    company_website: '', // Honeypot — hidden from humans, filled by bots.
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return

    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch {
      setError('We could not reach the server. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16">
        <div className="bronze-rule mx-auto mb-6" />
        <h2 className="font-display font-light text-charcoal mb-3" style={{ fontSize: '2rem' }}>
          Thank you.
        </h2>
        <p className="font-sans text-base" style={{ color: 'var(--warm-gray)', maxWidth: '38ch' }}>
          We&apos;ve received your message and will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
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

      {/* Honeypot — visually hidden, off the tab order, invisible to screen readers. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
        <label>
          Company Website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_website}
            onChange={handleChange}
          />
        </label>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-8 font-sans text-sm"
          style={{ color: 'var(--charcoal)', borderLeft: '2px solid var(--bronze)', paddingLeft: '1rem' }}
        >
          {error}
          <div className="mt-2" style={{ color: 'var(--warm-gray)' }}>
            You can also reach us at{' '}
            <a href="mailto:info@missionprop.com" className="transition-colors hover:text-bronze" style={{ textDecoration: 'underline' }}>
              info@missionprop.com
            </a>{' '}
            or{' '}
            <a href="tel:9809202200" className="transition-colors hover:text-bronze" style={{ textDecoration: 'underline' }}>
              (980) 920-2200
            </a>
            .
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          type="submit"
          className="btn-primary"
          disabled={sending}
          style={sending ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
        >
          {sending ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
