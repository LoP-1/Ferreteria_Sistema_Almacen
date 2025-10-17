/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}", // Esto le dice a Tailwind que revise todos los archivos .html y .ts dentro de la carpeta src
  ],
  theme: {
    extend: {
      colors: {
        // --- Paleta de colores existente (MODO CLARO) - SIN CAMBIOS ---
        'primary': '#87A382',         // Verde Salvia (Base Calmante y Natural)
        'primary-hover': '#B0C2AE',     // Tono intermedio de Salvia para el Hover
        'secondary': '#EAD2AC',         // Beige Dorado / Vainilla Suave (Acento Cálido)
        'accent-red': '#CC735C',       // Naranja Quemado / Ladrillo (Alerta Terrosa Suave)
        'accent-green': '#546A66',     // Verde Bosque Oscuro / Petrol (Contraste Natural)
        'neutral-light': '#F8F6F1',    // Crema/Blanco Hueso (Fondo Cálido y Suave)
        'text-dark': '#5B5B5B',
        'danger': '#EF4444',            // Rojo para errores
        'danger-hover': '#DC2626',      // Rojo más oscuro

        // --- Paleta de colores existente (MODO OSCURO) - SIN CAMBIOS ---
        'dark-background': '#323938',   // Fondo Oscuro (Reemplaza a neutral-light)
        'dark-text': '#EAE6DF',         // Texto Claro (Reemplaza a text-dark)
        'dark-primary': '#A8B7A6',     // Primary adaptado
        'dark-red': '#E0987F',         // Accent Red adaptado
        'dark-green': '#7DA5A1',       // Accent Green adaptado

        // --- NUEVOS COLORES AÑADIDOS PARA COMPATIBILIDAD ---
        // Se añaden los colores que el CSS del formulario necesita,
        // usando tonos que encajan con la paleta existente.
        'primary-dark': '#6c8668',      // Un tono más oscuro de 'primary' para hover/active
        'accent-green-dark': '#425451', // Un tono más oscuro de 'accent-green'
        'dark-card': '#414A49',         // Color para tarjetas en modo oscuro
        'dark-field': '#4a5251',        // Color para campos de formulario en modo oscuro
        'dark-border': '#4a5251',       // Color para bordes en modo oscuro
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Una fuente moderna y limpia
      },
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        blob: 'blob 7s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      }
    },
  },
  plugins: [],
}