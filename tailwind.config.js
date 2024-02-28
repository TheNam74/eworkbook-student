/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    // ...
    // eslint-disable-next-line global-require
    require('@tailwindcss/line-clamp'),
  ],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#2c4073',
        secondary: '#ffa54e',
        third: '#ffe5b4',
        oddText: '#a0a0a0',
        right: 'green',
        wrong: '#b50000',
      },
    },
    screens: {
      xs: { max: '575px' },
      // => @media (max-width: 576px) { ... }

      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1600px',
      // => @media (min-width: 1600px) { ... }
    },
  },

  prefix: 'tw-',
}
