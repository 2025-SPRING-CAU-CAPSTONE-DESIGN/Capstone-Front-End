export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        ansim2: ['ansim2'],
        ansim: ['ansim']
      },
      animation: {
        'ping-fast': 'ping-fast 0.5s ease-out',
        'shake': 'shake 0.4s ease-in-out',
        'shimmer': 'shimmer 4s linear infinite',
      },
      keyframes: {
        'ping-fast': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundSize: {
        shimmer: '50% 100%',
      },
    },
  },
  plugins: [],
};