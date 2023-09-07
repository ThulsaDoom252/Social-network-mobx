import React, {useState} from 'react';
import authHoc from "../hoc/authHoc";
import {Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import authStore from "../mobx/auth/auth";
import {Button, Input} from "antd";

interface authContainerProps {
    smallScreenMode: boolean;
    isLogged: boolean;
}

const Auth: React.FC<authContainerProps> = ({smallScreenMode, isLogged}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm();

    const [isFormDisabled, setIsFormDisabled] = useState(false)

    const errorStyle = 'text-red-500  text-sm w-full text-center'

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsFormDisabled(true)
        authStore.signIn(data.email, data.password, true, data.captcha).finally(() => {
            setIsFormDisabled(false)
        });
    };

    // const isFormDisabled: boolean = authStore.fetchAuthData;
    const authError: string = authStore.authErrorText;
    const isAuthError: boolean = authError !== "";
    const isCaptchaRequired = authStore.isCaptchaRequired
    const captchaUrl: string = authStore.captchaUrl

    return (
        <div
            className={`
        flex 
        items-center 
        justify-center
        ${smallScreenMode ? "h-screen w-screen"
                : "w-auth translate-y-1/2 h-auth container mx-auto p-3"}
      `}
        >
            {!smallScreenMode && (
                <div className="
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
                    <p className="mt-4 text-center">
                        Enter your personal details to start your journey with us.
                    </p>
                    <Button
                        href={"https://social-network.samuraijs.com/signUp"}
                        target={"_blank"}
                        className={"mt-3"}
                        ghost
                    >
                        Sign up
                    </Button>
                </div>
            )}
            <div
                className={`
            relative
            w-full 
            flex 
            rounded-r-md
            flex-col 
            bg-white
            ${smallScreenMode ? "rounded-l-md h-1/2 justify-center" : "bg-white h-full justify-start "}
            `}
            >
                <h2 className={`text-3xl font-bold text-center ${!smallScreenMode && 'mb-8 mt-10'}`}>Sign in</h2>
                {isAuthError && (
                    <p className={`
                    mt-1
                    text-red-500 
                    w-full             
                    text-center              
                    `}>{authError}</p>
                )}
                <form className="flex flex-col mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className={'w-1/2 flex flex-col mx-auto'}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Not email format',
                                },
                            }}
                            render={({field}) => (
                                <div>
                                    <Input
                                        status={errors.email ? 'error' : ''}
                                        className={'mb-1'}
                                        disabled={isFormDisabled}
                                        {...field}
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className={errorStyle}>{errors.email.message as string}</p>
                                    )}
                                </div>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must contain more than 5 symbols',
                                },
                            }}
                            render={({field}) => (
                                <div>
                                    <Input
                                        status={errors.password ? 'error' : ''}
                                        className={'mb-1'}
                                        disabled={isFormDisabled}
                                        {...field}
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className={errorStyle}>{errors.password.message as string}</p>
                                    )}
                                </div>
                            )}
                        />
                        {isCaptchaRequired && <div className={`
                        flex 
                        flex-col 
                        justify-center 
                        items-center                        
                        `}>
                            <img src={captchaUrl} alt={'captcha-image'}/>
                            <Controller
                                name="captcha"
                                control={control}
                                rules={{
                                    required: 'enter symbols!',
                                }}
                                render={({field}) => (
                                    <div className="relative">
                                        <Input
                                            status={errors.captcha ? 'error' : ''}
                                            className={'mb-4'}
                                            disabled={isFormDisabled}
                                            {...field}
                                            placeholder="Enter antibot symbols"
                                        />
                                        {errors.captcha && (
                                            <p className={errorStyle}>{errors.captcha.message as string}</p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>}
                        <Button
                            disabled={isFormDisabled}
                            className={'bg-blue-300 mt-2'}
                            type="primary"
                            htmlType={'submit'}>
                            {isFormDisabled ? 'Please wait..' : 'Login'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default authHoc(Auth);
