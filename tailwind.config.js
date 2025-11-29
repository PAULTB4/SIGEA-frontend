/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: '#598AEB',
          primaryDark: '#3A5FAA',
          primaryLight: '#7BA3F0',
          secondary: '#59C87B',
          secondaryDark: '#2F8F54',
          secondaryLight: '#7DD89B',
          accent: '#59EBBF',
          accentDark: '#2FC99F',
          accentLight: '#7FF0D0',
          tertiary: '#A7D3EB',
          tertiaryDark: '#7AB8D6',
          tertiaryLight: '#C2E1F2',
        },
        // Neutral Colors
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
          background: '#f9fafb',
          text: '#0F172A',
          textLight: '#FFFFFF',
        },
        // Semantic Colors
        semantic: {
          success: '#22C55E',
          successLight: '#86EFAC',
          successDark: '#16A34A',
          warning: '#F59E0B',
          warningLight: '#FCD34D',
          warningDark: '#D97706',
          error: '#EF4444',
          errorLight: '#FCA5A5',
          errorDark: '#DC2626',
          info: '#3B82F6',
          infoLight: '#93C5FD',
          infoDark: '#2563EB',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};