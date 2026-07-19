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
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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

      <div className="mt-8">
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </div>
    </form>
  )
}
