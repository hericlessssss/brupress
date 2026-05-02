import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: 'var(--text-primary)',
        heading: 'var(--text-heading)',
        secondary: 'var(--text-secondary)',
        line: 'var(--border)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: [
          'Aptos Display',
          'Segoe UI Variable Display',
          'Manrope',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        shell: '430px',
      },
    },
  },
  plugins: [],
} satisfies Config;
