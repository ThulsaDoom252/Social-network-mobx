/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            width: {
                auth: '800px',
                profile: '880px',
                editModal: '1000px',
            },
            maxWidth: {
                container: '1300px',
            },
            inset: {
                mobileNavbar: '-1px',
                inputError: '-21px',
                captchaBlock: '-70px'
            },
            height: {
                '90vh': '90vh',
                'auth': '400px',
                'authRightBlock': '500px',
            },
            minHeight: {
              pageContainer: '500px',
            }


        },
    },
    plugins: [],
}

