const { colors } = require("./src/theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: colors.surface,
        ink: colors.ink,
        "ink-muted": colors.inkMuted,
        accent: colors.accent,
        "accent-soft": colors.accentSoft,
        "accent-strong": colors.accentStrong,
        action: colors.action,
        "action-hover": colors.actionHover,
        line: colors.line,
        "line-strong": colors.lineStrong,
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "50%": { opacity: 0.2 },
          "100%": { opacity: 0 },
        },
        "menu-fade": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        fade: "fade 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "menu-fade": "menu-fade 180ms ease-out",
      },
    },
  },
  plugins: [],
};
