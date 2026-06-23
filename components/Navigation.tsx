'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navBg = isHome
    ? scrolled
      ? 'bg-warm-white border-b border-border shadow-sm'
      : 'bg-transparent'
    : 'bg-warm-white border-b border-border'

  const logoColor = isHome && !scrolled ? 'text-white' : 'text-charcoal'
  const linkColor = isHome && !scrolled ? 'text-white/80 hover:text-white' : ''
  const burgerColor = isHome && !scrolled ? 'bg-white' : 'bg-charcoal'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}
        style={{ transitionDuration: '400ms' }}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className={`${logoColor} transition-colors duration-300`}>
              <div className="font-display font-light tracking-widest text-sm uppercase">
                Mission Properties
              </div>
              <div
                className="label-sm"
                style={{ color: isHome && !scrolled ? 'rgba(255,255,255,0.55)' : 'var(--warm-gray)' }}
              >
                LLC
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {/* About dropdown */}
              <div className="dropdown-parent relative">
                <span
                  className={`nav-link cursor-default ${linkColor} ${
                    pathname.startsWith('/about') || pathname === '/team' ? 'active' : ''
                  }`}
                  style={isHome && !scrolled ? { color: 'rgba(255,255,255,0.85)' } : {}}
                >
                  About Us
                </span>
                <div className="dropdown-menu">
                  <Link href="/about" className="dropdown-item">Our Mission</Link>
                  <Link href="/team" className="dropdown-item">Our Team</Link>
                </div>
              </div>

              <Link
                href="/current-projects"
                className={`nav-link ${linkColor} ${pathname === '/current-projects' ? 'active' : ''}`}
                style={isHome && !scrolled ? { color: 'rgba(255,255,255,0.85)' } : {}}
              >
                Current Projects
              </Link>

              <Link
                href="/completed-projects"
                className={`nav-link ${linkColor} ${pathname === '/completed-projects' ? 'active' : ''}`}
                style={isHome && !scrolled ? { color: 'rgba(255,255,255,0.85)' } : {}}
              >
                Completed Projects
              </Link>

              <Link href="/contact" className="btn-primary ml-4" style={{ padding: '0.6rem 1.5rem' }}>
                Contact Us
              </Link>
            </nav>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Open navigation"
            >
              <span className={`block w-6 h-px transition-colors ${burgerColor}`} />
              <span className={`block w-4 h-px transition-colors ${burgerColor}`} />
              <span className={`block w-6 h-px transition-colors ${burgerColor}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors"
          aria-label="Close navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-1">
          <Link href="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Our Mission</Link>
          <Link href="/team" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Our Team</Link>
          <Link href="/current-projects" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Current Projects</Link>
          <Link href="/completed-projects" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Completed Projects</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        </nav>

        <div className="absolute bottom-8 text-center">
          <p className="label-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            (980) 920-2200 &nbsp;·&nbsp; info@missionprop.com
          </p>
        </div>
      </div>
    </>
  )
}
