/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            filter: {
                'brightness-50': 'brightness(50%)',
                'brightness-75': 'brightness(75%)',
                'brightness-100': 'brightness(100%)',
                'brightness-125': 'brightness(125%)',
                'brightness-150': 'brightness(150%)',
            },
            colors: {
                bg: '#151A22',
                input: '#151A22',
                disabled: '#8690A4',
                'table-header': '#151A22',
                'tr-odd-child': '#262D39',
                'tr-even-child': '#1B222C',
                'chat-footer': '#37414E',
                secondary: '#5C626F',
                'card-bg': '#232A39',
                pink: '#E94880',
                orange: '#F8645B',
                'chart-circle': '#FDC026',
                red: '#F3586A',
                'default-border': '#393F4B',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
