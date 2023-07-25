const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        'sans': ['Rubik', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['dark']
  }
}

