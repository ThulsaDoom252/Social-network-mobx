/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'auth': "url('components/Auth/BG.png')"
            },
            width: {
                auth: '800px',
                profile: '880px',
                editModal: '1000px',
                mobileAuthModal: '80vw',
                desktopAuthModal: '450px',
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

