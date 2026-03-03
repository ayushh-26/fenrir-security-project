export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { teal: '#0CC8A8', tealDark: '#0aaf93' },
        sev: { critical: '#EF4444', high: '#F97316', medium: '#EAB308', low: '#22C55E' },
        dark: {
          bg: '#0F0F0F', surface: '#161616', card: '#1C1C1C',
          border: '#2A2A2A', muted: '#3A3A3A', text: '#E5E5E5', subtext: '#888888',
        },
        light: {
          bg: '#F5F5F5', surface: '#FFFFFF', card: '#FFFFFF',
          border: '#E5E7EB', muted: '#D1D5DB', text: '#111111', subtext: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}