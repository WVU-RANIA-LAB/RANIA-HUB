import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary-gold': '#eaaa00',
      'primary-blue': '#002855',
      'off-white': '#f7f7f7',
      'warm-gray-light': '#beb7b3',
      'warm-gray-dark': '#554741',
      'warm-gray-medium': '#988e8b',
      cream: '#f2e6c2',
      tan: '#b9ac77',
      'blue-dark': '#1c2b39',
      'blue-light': '#9ddae6',
      blue: '#0062a3',
      yellow: '#ffe539',
      'old-gold': '#7f6310',
      sunset: '#f58672',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
