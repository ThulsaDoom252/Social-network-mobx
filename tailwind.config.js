/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            width: {
                profile: '500px',
                '60%': '60%',
                '40%': '40%',
            },
            maxWidth: {
                container: '1300px',
            }


        },
    },
    plugins: [],
}

