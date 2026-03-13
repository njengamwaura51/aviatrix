/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        // Brand palette extracted from aspirebet.ke
        primary: '#E5E7EB',
        secondary: '#9CA3AF',
        accent: '#D1D5DB',
        springGreen: '#00FF7F',
        darkInk: '#11181C',
        coolGray: '#6B7280',
        magenta: '#C017B4',
        peach: '#FFCF92',
        charcoal: '#4B5563',
        redAlert: '#F55D5D',
        amber: '#CA8A04',
        emerald: '#16A34A',
        inkBlack: '#1B1C1D',
        jet: '#2A2B2E',
        lightGray: '#F3F4F6',
        ironGray: '#585B58',
        white: '#FFFFFF',
        slate: '#374151',
        obsidian: '#252528',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
      },
      spacing: {
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '10': '40px',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

