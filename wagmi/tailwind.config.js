module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // Permet à Tailwind de scanner tous tes fichiers
    ],
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 0.5s ease-out forwards',
          scaleIn: 'scaleIn 0.4s ease-out forwards',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.8)' },
            '100%': { transform: 'scale(1)' },
          },
        },
      },
    },
    plugins: [],
  }
  