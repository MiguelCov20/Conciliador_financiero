import type { Config } from "tailwindcss";

const config: Config = {
  // LINEA PARA MODO OSCURO:
  darkMode: ["class"], 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aquí podrías definir tus azules de Simetrik si quisieras
      },
    },
  },
  plugins: [],
};
export default config;