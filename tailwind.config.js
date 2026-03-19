/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F13',
        foreground: '#F5F5F7',
        card: '#1E1E2E',
        'card-foreground': '#F5F5F7',
        popover: '#1E1E2E',
        'popover-foreground': '#F5F5F7',
        primary: '#3b82f6',
        'primary-foreground': '#ffffff',
        secondary: '#374151',
        'secondary-foreground': '#F5F5F7',
        muted: '#374151',
        'muted-foreground': '#9ca3af',
        accent: '#3b82f6',
        'accent-foreground': '#ffffff',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        border: '#374151',
        input: '#374151',
        ring: '#3b82f6',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
