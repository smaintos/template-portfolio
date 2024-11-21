// tailwind.config.js
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#000000", // Bleu pour les survols et les états actifs
      },
      fontSize: {
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // Taille de texte petite
      },
    },
  },
  plugins: [],
} satisfies Config;
