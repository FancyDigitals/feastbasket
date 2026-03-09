// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
}