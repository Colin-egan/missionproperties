import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F4EFE6',
        'warm-white': '#FDFAF5',
        charcoal: '#1A1714',
        bronze: '#B8773A',
        'bronze-light': '#D4956A',
        slate: '#2E3D4E',
        'warm-gray': '#857D75',
        border: '#DDD5C8',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'extra-wide': '0.15em',
      },
    },
  },
  plugins: [],
}

export default config
