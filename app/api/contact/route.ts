import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const TO_EMAILS = (process.env.CONTACT_TO_EMAILS ?? 'tom@missionprop.com,jason@missionprop.com')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? 'Mission Properties Website <mission@contact.eganlab.com>'

/** Generous ceilings — long enough for a real inquiry, short enough to blunt abuse. */
const LIMITS = {
  name: 200,
  email: 320,
  phone: 50,
  company: 200,
  subject: 200,
  message: 5000,
} as const

type Field = keyof typeof LIMITS

/** Deliberately loose: the goal is catching typos, not policing the RFC. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Header injection guard: a newline in a field that lands in Subject or Reply-To
 * could otherwise smuggle in extra headers.
 */
function stripNewlines(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: hidden from humans, irresistible to bots. Feign success so the
  // bot doesn't retry with a different shape.
  if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const read = (field: Field) => {
    const raw = body[field]
    return typeof raw === 'string' ? raw.trim() : ''
  }

  const name = read('name')
  const email = read('email')
  const phone = read('phone')
  const company = read('company')
  const subject = read('subject')
  const message = read('message')

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    )
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const overLimit = (Object.keys(LIMITS) as Field[]).find(
    (field) => read(field).length > LIMITS[field],
  )
  if (overLimit) {
    return NextResponse.json({ error: `Your ${overLimit} is too long.` }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set — cannot send contact form email.')
    return NextResponse.json(
      { error: 'The contact form is not configured. Please email us directly.' },
      { status: 500 },
    )
  }

  const inquiryType = subject || 'General Information'
  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Company', company || '—'],
    ['Subject', inquiryType],
  ]

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1A1714; max-width: 600px;">
      <h2 style="font-weight: 500; border-bottom: 2px solid #B8773A; padding-bottom: 8px;">
        New Contact Form Submission
      </h2>
      <table style="border-collapse: collapse; margin-bottom: 24px;">
        ${rows
          .map(
            ([label, value]) => `
        <tr>
          <td style="padding: 6px 16px 6px 0; color: #857D75; vertical-align: top; white-space: nowrap;">${label}</td>
          <td style="padding: 6px 0;">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join('')}
      </table>
      <div style="color: #857D75; margin-bottom: 6px;">Message</div>
      <div style="white-space: pre-wrap; line-height: 1.6; padding: 16px; background: #F7F5F2;">${escapeHtml(message)}</div>
      <p style="color: #857D75; font-size: 13px; margin-top: 24px;">
        Sent from the missionprop.com contact form. Reply directly to respond to ${escapeHtml(name)}.
      </p>
    </div>
  `

  const text = [
    'New Contact Form Submission',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    message,
    '',
    `Sent from the missionprop.com contact form. Reply directly to respond to ${name}.`,
  ].join('\n')

  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      replyTo: stripNewlines(email),
      subject: stripNewlines(`Website Inquiry: ${inquiryType} — ${name}`),
      html,
      text,
    })

    if (error) {
      console.error('[contact] Resend rejected the send:', error)
      return NextResponse.json(
        { error: 'We could not send your message. Please email or call us directly.' },
        { status: 502 },
      )
    }

    console.log(`[contact] Sent inquiry ${data?.id} from ${email}`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error sending contact form email:', err)
    return NextResponse.json(
      { error: 'We could not send your message. Please email or call us directly.' },
      { status: 500 },
    )
  }
}
