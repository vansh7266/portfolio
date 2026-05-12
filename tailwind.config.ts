import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        night: "#111111",
        panel: "#161616",
        line: "rgba(255,255,255,0.1)",
        muted: "#71717A",
        soft: "#A1A1AA",
        electric: "#3B82F6",
        violet: "#8B5CF6",
        cyan: "#06B6D4",
        emerald: "#10B981"
      },
      boxShadow: {
        glow: "0 0 44px rgba(59,130,246,0.18)",
        "glow-cyan": "0 0 40px rgba(6,182,212,0.16)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 28%), radial-gradient(circle at 72% 16%, rgba(139,92,246,0.14), transparent 28%), radial-gradient(circle at 50% 82%, rgba(6,182,212,0.12), transparent 34%)",
        "premium-gradient":
          "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 48%, #06B6D4 100%)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        gridShift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-40px,-40px,0)" }
        }
      },
      animation: {
        shimmer: "shimmer 5s linear infinite",
        float: "float 6s ease-in-out infinite",
        gridShift: "gridShift 18s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
