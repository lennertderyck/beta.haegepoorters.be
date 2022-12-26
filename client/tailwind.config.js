/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            'body': ['Sora', 'system-ui'],
            'sans': ['Sora', 'system-ui'],
            'serif': ['Podkova', 'Georgia'],
        },
        container: {
            center: true,
        },
        extend: {
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
                },
                'kiwi': {
                    '100': '#F4F5D9',
                    '500': '#C0C626',
                }
            },
        },
        dropShadow: {
            'softCenter': '0px 0px 13px 7px #0000000a'
        },
    },
    plugins: [],
}
