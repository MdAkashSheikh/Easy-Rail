const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const brandColor = colors.teal;

/** @type {import('tailwindcss').Config} */
module.exports = {
    // Add support for dark mode, toggled via a class:
    // https://tailwindcss.com/docs/dark-mode
    darkMode: 'class',
    // Inform Tailwind of where our classes will be defined:
    // https://tailwindcss.com/docs/optimizing-for-production
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                gray: colors.gray,
                brand: brandColor,
            },
            ringColor: {
                DEFAULT: brandColor['500'],
            },
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('daisyui')],
    daisyui: {
        themes: [
            {
                wtheme: {
                    primary: '#006747',
                    secondary: '#F000B8',
                    accent: '#37CDBE',
                    neutral: '#3D4451',
                    'base-100': '#FFFFFF',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#F87272',
                },
            },
        ],
    },
};
