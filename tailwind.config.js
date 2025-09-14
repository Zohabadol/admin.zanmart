/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {
      animation: {
        wave: 'wave 2s ease-out infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'scale(0.5)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
      fontFamily: {
        heading: "'Russo One', sans-serif",
        content: "'Rajdhani', sans-serif"
      },
      colors: {
        'primary': "#3B82F6",
        light: '#F9FAFB',
        dark: '#111827',
        lightCard: '#FFFFFF',
        darkCard: '#1E293B',
        lightBorder: '#E5E7EB',
        darkBorder: '#374151',
        lightTitle: '#1E293B',
        lightPrimary: '#334155',
        lightSecondary: '#64748B',
        lightAccent: '#4F46E5',
        darkAccent: '#6366F1',
        darkTitle: '#F3F4F6',
        darkPrimary: '#E5E7EB',
        darkSecondary: '#9CA3AF',
      }
    },
  },
  plugins: [require("daisyui")],
}