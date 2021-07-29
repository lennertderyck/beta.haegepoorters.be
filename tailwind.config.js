module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['Sora', 'system-ui'],
            'serif': ['Podkova', 'Georgia'],
        },
        textColor: theme => theme('colors'),
        container: {
            center: true,
        },
        extend: {
            maxWidth: {
                'screen': '100vw'
            },
            colors: {
                'gray': {
                    '500': '#707070',
                    '400': '#9a9a9a',
                    '300': '#d9d9d9',
                    '200': '#ececec',
                    '100': '#fafafa',
                },
                'red': {
                    '500': '#6f101d',
                }
            },
            spacing: {
                'fit': 'fit-content'
            },
            transitionDuration: {
                '600': '600ms'
            }
        }
    },
    variants: {
        extend: {
            padding: ['first']
        },
    },
    plugins: [],
}
