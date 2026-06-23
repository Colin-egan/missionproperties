'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/about', label: 'Our Mission' },
  { href: '/team', label: 'Team' },
  { href: '/current-projects', label: 'Current Projects' },
  { href: '/completed-projects', label: 'Completed Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(26,23,20,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="container-site">
          <nav className="flex items-center justify-between py-4 md:py-5">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="Mission Properties home">
              <Image
                src="/images/logo-transparent.png"
                alt="Mission Properties"
                width={140}
                height={48}
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-sans text-sm transition-colors duration-200"
                  style={{ color: 'rgba(244,239,230,0.65)' }}
                  onMouseOver={e => (e.currentTarget.style.color = 'var(--bronze-light)')}
                  onMouseOut={e => (e.currentTarget.style.color = 'rgba(244,239,230,0.65)')}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger — 44×44 tap target */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px]"
              style={{ width: '44px', height: '44px' }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: 'rgba(244,239,230,0.8)',
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: 'rgba(244,239,230,0.8)',
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: 'rgba(244,239,230,0.8)',
                  transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* ── Full-screen mobile nav overlay ───────────────────── */}
      <div
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        {/* Top bar: logo + close */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Mission Properties home">
            <Image
              src="/images/logo-transparent.png"
              alt="Mission Properties"
              width={120}
              height={40}
              style={{ objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.75)' }}
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center"
            style={{
              width: '44px',
              height: '44px',
              color: 'rgba(244,239,230,0.5)',
              fontSize: '2rem',
              fontWeight: 200,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Centered nav links — uses .mobile-nav-link + nth-child stagger from globals.css */}
        <nav className="flex flex-col items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom contact line */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
          style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
        >
          <a
            href="tel:9809202200"
            className="label-sm"
            style={{ color: 'rgba(244,239,230,0.22)', letterSpacing: '0.18em' }}
          >
            (980) 920-2200
          </a>
        </div>
      </div>
    </>
  )
}
