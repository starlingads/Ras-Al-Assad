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
        // Colour is role-based, not just brand-based: the same gold cannot be
        // both a decorative fill and readable body text. Ratios below are
        // measured against the worst-case background for that role.
        ras: {
          // Brand gold. Fills, borders, icons, and text on dark surfaces
          // (8.28:1 on charcoal, 5.38:1 on green). Never use as text on a
          // light surface — it lands at 2.2:1. Use goldInk there.
          gold: '#C5A880',
          // Hover/pressed state for gold fills. Fill only, never text.
          goldDark: '#A4855C',
          // Gold as text on light surfaces. Same hue (34.8deg) and saturation
          // (37.3%) as the brand gold, darkened until it clears AA:
          // 4.99:1 on sand, 5.34:1 on light.
          goldInk: '#82643B',

          charcoal: '#121212',
          sand: '#F7F4EF',
          green: '#1E3B32',
          light: '#FCFCFC',

          // Secondary text on light surfaces: 5.08:1 on sand, 5.43:1 on light.
          grey: '#686868',
          // Secondary text on dark surfaces: 7.88:1 on charcoal, 5.11:1 on
          // green. The light-surface grey drops to 3.36:1 here, so dark
          // surfaces need their own step.
          greyOnDark: '#A8A8A8',
        },
      },
      fontFamily: {
        sans: ['var(--font-text)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      height: {
        header: '70px',
      },
    },
  },
  plugins: [],
};
