import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Source Sans 3'", "sans-serif"]
      },
      colors: {
        ink: {
          50: "#f6f4f1",
          100: "#ece6dd",
          200: "#d9cec0",
          300: "#c2b29f",
          400: "#a6917a",
          500: "#8c765f",
          600: "#735e4c",
          700: "#5e4c3d",
          800: "#47392e",
          900: "#2e241d"
        },
        brass: {
          50: "#fff8e6",
          100: "#fdeec0",
          200: "#f6d98c",
          300: "#e9bf56",
          400: "#d9a232",
          500: "#c1831f",
          600: "#9c6519",
          700: "#7b4c16",
          800: "#5b3813",
          900: "#3c240f"
        },
        slateblue: {
          50: "#eef1f7",
          100: "#d8deee",
          200: "#b6c2de",
          300: "#91a2ca",
          400: "#6e83b4",
          500: "#54679c",
          600: "#3f4d79",
          700: "#2f3b5e",
          800: "#212a43",
          900: "#141a2b"
        }
      },
      boxShadow: {
        card: "0 20px 60px -30px rgba(33,42,67,0.45)",
        soft: "0 10px 40px -20px rgba(46,36,29,0.35)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(84,103,156,0.45), transparent 60%)",
        "grid-faint": "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
