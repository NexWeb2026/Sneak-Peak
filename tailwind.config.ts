import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#111111",
          bone: "#f4efe6",
          red: "#dc3f2c",
          volt: "#ccff00",
          smoke: "#e8e5dc",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
};

export default config;
