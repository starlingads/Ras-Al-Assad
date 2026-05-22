/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        virya: {
          orange: '#C5A880', // Solar Gold
          greenLight: '#1E3B32', // DEWA Green
          greenDark: '#121212', // Obsidian Black
          beige: '#F7F4EF', // Warm Sand
          dark: '#121212', // Obsidian Black
          light: '#FCFCFC', // Architectural Light
          grey: '#888888', // Muted Grey
        },
        ras: {
          gold: '#C5A880',
          goldDark: '#A4855C',
          charcoal: '#121212',
          sand: '#F7F4EF',
          green: '#1E3B32',
          light: '#FCFCFC',
          grey: '#888888',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      height: {
        header: '70px',
      }
    },
  },
  plugins: [],
};
