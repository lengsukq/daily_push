import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "28px",
      },
      colors: {
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        "3d": {
          cyan: "#06b6d4",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          accent: "#f59e0b",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backdropBlur: {
        glass: "25px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px) translateZ(-20px)" },
          to: { opacity: "1", transform: "translateY(0) translateZ(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95) translateZ(-10px)" },
          to: { opacity: "1", transform: "scale(1) translateZ(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) translateZ(0)" },
          "50%": { transform: "translateY(-10px) translateZ(20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(147, 51, 234, 0.3)" },
        },
        "light-sweep": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        rotate: {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "light-sweep": "light-sweep 0.6s ease",
        rotate: "rotate 20s linear infinite",
      },
      boxShadow: {
        "depth": "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
        "depth-lg": "0 35px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08) inset",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.4)",
        "glow-purple": "0 0 30px rgba(147, 51, 234, 0.4)",
        "glow-emerald": "0 0 30px rgba(16, 185, 129, 0.4)",
        "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.4)",
        "glow-amber": "0 0 30px rgba(245, 158, 11, 0.4)",
        "inner-depth": "0 4px 6px -1px rgba(0, 0, 0, 0.3) inset, 0 2px 4px -2px rgba(0, 0, 0, 0.2) inset",
        "3d-light": "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        "3d-medium": "0 8px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        "3d-heavy": "0 15px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      },
      transformOrigin: {
        "center": "center",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
