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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(26,23,20,0.95)'
          : 'transparent',
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span
              className="block w-6 h-px transition-all duration-200"
              style={{
                background: 'rgba(244,239,230,0.8)',
                transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-200"
              style={{
                background: 'rgba(244,239,230,0.8)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-200"
              style={{
                background: 'rgba(244,239,230,0.8)',
                transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden py-6 flex flex-col gap-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-base"
                style={{ color: 'rgba(244,239,230,0.75)' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
