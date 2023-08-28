/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            width: {
                profile: '700px',
            },
            maxWidth: {
                container: '1300px',
            }


        },
    },
    plugins: [],
}

