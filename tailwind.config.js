/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Navy Ramps (§1.1)
        'navy-50': '#EDF0F5',
        'navy-100': '#D6DCE8',
        'navy-200': '#AEB9D0',
        'navy-300': '#7E8CAF',
        'navy-400': '#4C5C87',
        'navy-500': '#243A63',
        'navy-700': '#0A1830',
        'navy-800': '#070F20',
        'navy-900': '#040914',

        // Gold Ramps (§1.1)
        'gold-50': '#FDF3E1',
        'gold-100': '#FAE3B3',
        'gold-200': '#F6D085',
        'gold-300': '#F3BD5C',
        'gold-500': '#F0A824',
        'gold-600': '#D6910F',
        'gold-700': '#B3760A',
        'gold-900': '#5C3D05',

        // Blue Ramps (§1.1)
        'blue-50': '#E6F4FC',
        'blue-300': '#5CBBEA',
        'blue-500': '#0288D1',
        'blue-700': '#01608F',

        // Green Ramps (§1.1)
        'green-50': '#E9F8EF',
        'green-500': '#16A34A',
        'green-700': '#0F7A37',

        // Red Ramps (§1.1)
        'red-50': '#FDECEA',
        'red-500': '#E5231B',
        'red-700': '#AD1912',

        // Neutral / Surface (§1.1)
        'surface': '#FFFFFF',
        'page': '#F6F8FB',
        'page-warm': '#FAF8F4',
        'ink-900': '#101826',
        'ink-600': '#4B5468',
        'ink-300': '#9AA1B0',
        'border': '#E3E7EE',

        // Backward compatibility semantic mappings
        'bg-page': '#F6F8FB',
        'text-primary': '#101826',
        'text-secondary': '#4B5468',
        'text-oncolor': '#FFFFFF',
        'strikethrough': '#9AA1B0',
        'blue-600': '#0288D1',
        'red-600': '#E5231B',
        'green-600': '#16A34A',
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '20px',
        'space-6': '24px',
        'space-8': '32px',
        'space-10': '40px',
        'space-16': '64px',
        'space-20': '80px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        btn: '8px',
        card: '8px',
        input: '6px',
        modal: '12px',
      },
      boxShadow: {
        'card-rest': 'none',
        'card-hover': '0 6px 16px rgba(10, 24, 48, 0.10)',
        'btn-hover': '0 2px 6px rgba(10, 24, 48, 0.15)',
        'trust-panel': '0 8px 24px rgba(10, 24, 48, 0.12)',
      },
    },
  },
  plugins: [],
};
