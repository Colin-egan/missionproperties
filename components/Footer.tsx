'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
      <div className="container-site">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="font-display font-light tracking-widest text-sm uppercase mb-1">
              Mission Properties
            </div>
            <div className="label-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>LLC</div>
            <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '22ch' }}>
              <em className="font-display font-light" style={{ fontStyle: 'italic', fontSize: '1.05rem' }}>Bespoke</em> multifamily
              development across the Southeastern United States.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-md mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'Our Mission' },
                { href: '/team', label: 'Our Team' },
                { href: '/current-projects', label: 'Current Projects' },
                { href: '/completed-projects', label: 'Completed Projects' },
                { href: '/contact', label: 'Contact Us' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-sans text-sm transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--bronze-light)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="label-md mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>Contact</p>
            <address className="not-italic font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <p>5800 Old Pineville Road</p>
              <p>Suite 201</p>
              <p className="mb-4">Charlotte, NC 28217</p>
              <a
                href="tel:9809202200"
                className="block mb-1 transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--bronze-light)')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                (980) 920-2200
              </a>
              <a
                href="mailto:info@missionprop.com"
                className="transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--bronze-light)')}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                info@missionprop.com
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="label-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Mission Properties, LLC. All rights reserved.
          </p>
          <p className="label-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Charlotte, NC · Raleigh · Asheville · Charleston
          </p>
        </div>
      </div>
    </footer>
  )
}
