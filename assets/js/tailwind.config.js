tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f0f5ff',
                    400: '#a855f7',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    neonCyan: '#06b6d4',
                    neonPink: '#ec4899',
                    darkBg: '#08080d',
                    cardBg: '#12121a'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.03)' }
                },
                floatUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                logoPulse: {
                    '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))', transform: 'scale(1) rotate(0deg)' },
                    '50%': { filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.9)) drop-shadow(0 0 35px rgba(168, 85, 247, 0.8))', transform: 'scale(1.08) rotate(3deg)' }
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                }
            },
            animation: {
                'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
                'float-up': 'floatUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'logo-anim': 'logoPulse 3s ease-in-out infinite',
                'shimmer-text': 'shimmer 4s linear infinite'
            }
        }
    }
}
