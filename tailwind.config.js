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
            maxWidth: (theme) => ({
                ...theme('spacing'),
                'screen': '100vw',
                '1/2': '50%',
            }),
            minWidth: {
                'screen-1/2': '50vw',
                'screen-2/3': '66vw'
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
                'fit': 'fit-content',
                'screen-x': '100vw',
                'screen-y': '100vh',
            },
            inset: {
                'screen-x': '100vw',
                'screen-y': '100vh',
                '-screen-x': '-100vw',
                '-screen-y': '-100vh',
            },
            transitionDuration: {
                '600': '600ms'
            },
            brightness: {
                '60': '.6'
            }
        }
    },
    variants: {
        extend: {
            padding: ['first', 'last'],
            spacing: ['first', 'last'],
            margin: ['last'],
            borderWidth: ['last']
        },
    },
    plugins: [],
}
