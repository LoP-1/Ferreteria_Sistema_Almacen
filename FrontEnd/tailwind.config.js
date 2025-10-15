/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}", // Esto le dice a Tailwind que revise todos los archivos .html y .ts dentro de la carpeta src
  ],
  theme: {
    extend: {
      colors: {
        // 1. Colores del MODO CLARO (Default)
        'primary': '#6D3F66', 	   // Púrpura Profundo / Berenjena (Base Intensa)
        'primary-hover': '#9B6B94',  // Tono intermedio de Púrpura para el Hover
        'secondary': '#FFC400', 	   // Amarillo Cítrico Brillante (Acento Vivo y Llamativo)
        'accent-red': '#D32F2F', 	   // Rojo Puro (Alerta Clara y Directa)
        'accent-green': '#009688',   // Verde Azulado / Turquesa Oscuro (Equilibrio Fresco)
        'neutral-light': '#FFFFFF',  // Blanco Puro (Fondo Limpio)
        'text-dark': '#1F1E1E', 	   // Negro Suave (Texto)

        // 2. Colores del MODO OSCURO (Adaptación)
        'dark-background': '#1A181C', // Fondo Oscuro (Reemplaza a neutral-light)
        'dark-text': '#F5F5F5', 	   // Texto Claro (Reemplaza a text-dark)
        'dark-primary': '#A6799F', 	// Primary adaptado
        'dark-red': '#FF8A80', 	   // Accent Red adaptado
        'dark-green': '#4DB6AC', 	   // Accent Green adaptado
        // Los colores 'secondary' y 'primary-hover' generalmente se mantienen por su función de acento.
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Una fuente moderna y limpia
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      }
    },
  },
  plugins: [],
}