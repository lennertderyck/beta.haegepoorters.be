module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
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
                    '100': '#fafafa',
                    '200': '#ececec',
                    '300': '#d9d9d9',
                    '400': '#9a9a9a',
                    '500': '#707070',
                },
                'red': {
                    '100': '#F7F3F4',
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
            padding: ['first'],
            margin: ['last']
        },
    },
    plugins: [],
}
