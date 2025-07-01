/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#d4af37',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#c0c0c0',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#d4af37',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				// Medieval Luxury Colors
				gold: '#d4af37',
				'gold-light': '#f4e4a6',
				'gold-dark': '#b8941f',
				silver: '#c0c0c0',
				'silver-light': '#e8e8e8',
				'silver-dark': '#a0a0a0',
				'luxury-black': '#0a0a0a',
				'deep-black': '#000000',
			},
			fontFamily: {
				'garamond': ['EB Garamond', 'Garamond', 'serif'],
				'baskerville': ['Libre Baskerville', 'Baskerville', 'serif'],
				'cinzel': ['Cinzel', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-left': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0%)' },
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-left': 'slide-left 0.8s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
			},
			backgroundImage: {
				'luxury-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
				'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f4e4a6 50%, #d4af37 100%)',
				'silver-gradient': 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 50%, #c0c0c0 100%)',
			}
		},
	},
	plugins: [require('tailwindcss-animate')],
}