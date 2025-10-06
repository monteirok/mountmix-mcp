import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom mountain mixology theme with glass
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					foreground: 'hsl(var(--gold-foreground))'
				},
				'dark-surface': 'hsl(var(--dark-surface))',
				'darker-surface': 'hsl(var(--darker-surface))',
				'mountain-text': 'hsl(var(--mountain-text))',
				'mountain-muted': 'hsl(var(--mountain-muted))',
				// Liquid Glass Colors
				glass: {
					bg: 'hsla(var(--glass-bg), var(--glass-bg-opacity))',
					border: 'hsla(var(--glass-border), var(--glass-border-opacity))',
					highlight: 'hsla(var(--glass-highlight), var(--glass-highlight-opacity))',
					shadow: 'hsla(var(--glass-shadow), var(--glass-shadow-opacity))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				DEFAULT: '8px',
				md: '12px',
				lg: '16px',
				xl: '24px',
				'2xl': '40px',
				'3xl': '64px',
			},
			backgroundImage: {
				'glass-gradient': 'var(--glass-gradient-primary)',
				'glass-gradient-secondary': 'var(--glass-gradient-secondary)',
				'glass-gradient-accent': 'var(--glass-gradient-accent)',
				'reflection-gradient': 'var(--reflection-gradient)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glass-float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotateX(0deg)',
						'box-shadow': '0 8px 32px hsla(var(--glass-shadow), var(--glass-shadow-opacity))'
					},
					'50%': { 
						transform: 'translateY(-10px) rotateX(2deg)',
						'box-shadow': '0 25px 50px hsla(var(--glass-shadow), calc(var(--glass-shadow-opacity) * 1.5))'
					}
				},
				'liquid-shimmer': {
					'0%': { 
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'50%': { 
						opacity: '1'
					},
					'100%': { 
						transform: 'translateX(100%)',
						opacity: '0'
					}
				},
				'glass-ripple': {
					'0%': {
						transform: 'scale(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(4)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glass-float': 'glass-float 6s ease-in-out infinite',
				'liquid-shimmer': 'liquid-shimmer 2s ease-in-out infinite',
				'glass-ripple': 'glass-ripple 0.6s ease-out'
			}
		}
	},
	plugins: [animatePlugin],
} satisfies Config;
