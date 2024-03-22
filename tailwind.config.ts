import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wvu-primary-gold': '#eaaa00',
        'wvu-primary-blue': '#002855',
        'wvu-off-white': '#f7f7f7',
        'wvu-warm-gray-light': '#beb7b3',
        'wvu-warm-gray-dark': '#554741',
        'wvu-warm-gray-medium': '#988e8b',
        'wvu-cream': '#f2e6c2',
        'wvu-tan': '#b9ac77',
        'wvu-blue-dark': '#1c2b39',
        'wvu-blue-light': '#9ddae6',
        'wvu-blue': '#0062a3',
        'wvu-yellow': '#ffe539',
        'wvu-old-gold': '#7f6310',
        'wvu-sunset': '#f58672',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: { darkTheme: 'light', logs: false },
};
export default config;
