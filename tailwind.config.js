/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Professional Palette: Navy × Crimson × Steel Blue ──
        navy: {
          50:  '#EEF2F8',
          100: '#D5DFF0',
          200: '#A9BDE1',
          300: '#7B9ACF',
          400: '#4F77BB',
          500: '#2A5FA8',
          600: '#1E4A8A',
          700: '#163872',
          800: '#0D265A',
          900: '#071642',
          950: '#030D2A',
        },
        crimson: {
          50:  '#FEF0F0',
          100: '#FCDCDC',
          200: '#F9B3B3',
          300: '#F47F7F',
          400: '#EE4B4B',
          500: '#C41E3A',  // ← Crimson brand
          600: '#A31630',
          700: '#830F25',
          800: '#62091A',
          900: '#41040F',
        },
        steel: {
          50:  '#EFF4FF',
          100: '#DBE8FF',
          200: '#B8D0FF',
          300: '#8AB1FF',
          400: '#5C8EF7',
          500: '#2563EB',  // ← Steel Blue
          600: '#1D50C2',
          700: '#153E9A',
          800: '#0E2D73',
          900: '#071D4C',
        },
        // Neutrals
        ink: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'navy':   '0 4px 24px rgba(7, 22, 66, 0.18)',
        'crimsn': '0 4px 24px rgba(196, 30, 58, 0.22)',
        'steel':  '0 4px 24px rgba(37, 99, 235, 0.18)',
        'card':   '0 1px 4px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
      }
    },
  },
  plugins: [],
}
