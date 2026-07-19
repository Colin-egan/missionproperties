import Image from 'next/image'
import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: string
  children?: ReactNode
  headerImage?: string | null
}

export default function PageHeader({ eyebrow, title, children, headerImage }: Props) {
  return (
    <section
      className="relative pt-36 pb-20 md:pt-44 md:pb-28"
      style={{ background: 'var(--charcoal)' }}
    >
      {headerImage && (
        <Image
          src={headerImage}
          alt=""
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.4 }}
          sizes="100vw"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: headerImage
            ? 'linear-gradient(to bottom, rgba(26,23,20,0.55) 0%, rgba(26,23,20,0.88) 100%)'
            : 'none',
        }}
      />
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
          <p className="label-md" style={{ color: 'rgba(244,239,230,0.4)' }}>{eyebrow}</p>
        </div>
        <h1 className="text-display-lg text-cream mb-4">{title}</h1>
        {children}
      </div>
    </section>
  )
}
