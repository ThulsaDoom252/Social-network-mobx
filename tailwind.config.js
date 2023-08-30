/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            width: {
                editModal: '1000px',
            },
            maxWidth: {
                container: '1300px',
            },
            inset: {
                mobileNavbar: '-1.4px'
            },
            height: {
                '90vh': '90vh',
            }


        },
    },
    plugins: [],
}

