import React from 'react';
import authStore from "../../mobx/auth/auth"


interface authProps {
    smallScreenMode: boolean,
    register: {},
    handleSubmit: (onSubmit: (data: FormData) => void) => (event: React.FormEvent<HTMLFormElement>) => void,
    onSubmit: (data: FormData) => void,
}

const Auth: React.FC<authProps> = ({
                                       smallScreenMode,
                                       register,
                                       handleSubmit,

                                   }) => {
    return (
        <div className={`
        p-3
        flex items-center justify-center
        ${smallScreenMode ? 'h-screen w-screen' :
            'w-auth translate-y-1/2 h-auth container mx-auto '}
        `}>
            {!smallScreenMode && <div className="
            bg-blue-300
            w-1/3
            rounded-l-md
            text-white
            p-8
             h-full
             flex
             flex-col
             justify-center
             items-center">
                <h1 className="text-2xl font-bold">Hello Friend!</h1>
                <p className="mt-4 text-center">Enter your personal details to start your journey with us.</p>
                <button className="bg-white text-black px-4 py-2 rounded-full mt-8 ">Sign up</button>
            </div>}
            <div className={`
            w-full 
            flex 
            rounded-r-md
            flex-col 
            bg-white
            ${smallScreenMode ? 'rounded-l-md h-1/2 justify-center' : 'bg-white h-full justify-start '}
            `}>
                <h2 className={`text-3xl font-bold text-center ${!smallScreenMode && 'mb-8 mt-10'}`}>Sign in</h2>
                <form className="flex flex-col mt-10">
                    <div className={'w-1/2 flex flex-col mx-auto'}>
                        <input className="bg-gray-200 px-4 py-2 rounded-md mb-4" type="email" placeholder="Email"/>
                        <input className="bg-gray-200 px-4 py-2 rounded-md mb-4" type="password"
                               placeholder="Password"/>
                        <button className="
                       bg-blue-300
                        text-white
                        px-4
                        py-2
                        mt-9
                        rounded-md
                        w-1/2
                        mx-auto"
                                onClick={(e) => {
                                    e.preventDefault()
                                    authStore.toggleLoggedStatus(true)
                                }}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth;