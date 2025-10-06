/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6C63FF",
          secondary: "#00BFA6",
          accent: "#FF6584",
          neutral: "#2A2E37",
          "base-100": "#F8FAFC",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        dark: {
          primary: "#9B8CFF",
          secondary: "#33DFC7",
          accent: "#FF85A1",
          neutral: "#191D24",
          "base-100": "#0B1220",
          info: "#93C5FD",
          success: "#4ADE80",
          warning: "#F59E0B",
          error: "#FCA5A5",
        },
      },
    ],
  },
};
/** @type {import('tailwindcss').Config} */
