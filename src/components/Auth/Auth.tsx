import React from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import Logo from "../../public/logo.png";
import {AuthField, OnFinishFunction} from "../../types";

interface DesktopLayoutProps {
    smallScreenMode: boolean,
    isAuthError?: boolean
    isCaptchaRequired: boolean,
    isFormDisabled: boolean,
    authError: string,
    onFinish: OnFinishFunction,
    onFinishFailed: (errorInfo: any) => void,
    captchaUrl: string,
}

const Auth: React.FC<DesktopLayoutProps> = ({
                                                smallScreenMode,
                                                isCaptchaRequired,
                                                isFormDisabled,
                                                authError,
                                                captchaUrl,
                                                onFinish,
                                                onFinishFailed,
                                            }) => {
    return (
        <div className={`     
        mt-20
        flex
        ${smallScreenMode ? 'w-full' : 'container'}
        `}>
            {/*//Left part*/}
            {!smallScreenMode &&
                <div
                    style={{
                        width: '500px',
                        height: '600px',
                    }}
                    className={`
            rounded-l-md
            relative    
            flex
            flex-col
            justify-center
            items-center       
            bg-auth
            bg-cover
            text-white
            font-serif
            `}>
                    <img className='absolute top-4 left-10 h-10' src={Logo} alt="logo"/>
                    <h1 className={'text-4xl'}>
                        Welcome
                    </h1>
                    <div className={'text-xl'}>Sign in to access all features</div>
                    <a
                        href="https://social-network.samuraijs.com/signUp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={'w-1/2'}
                    >
                        <Button
                            className={`
                        w-full 
                        bg-green-300  
                        text-white 
                        border-0
                        relative 
                        top-40 
                        hover:bg-green-200                   
                        `}

                            shape={'round'}>

                            Sign up
                        </Button> </a>
                    <div className={'relative top-40 text-base'}>No account?</div>
                </div>}
            {/*//Right Part*/}
            <div
                className={`
                 rounded-r-md
            bg-white
            font-serif
            p-10
            ${smallScreenMode && 'rounded-l-md'}
            ${smallScreenMode ? 'w-mobileAuthModal' : 'w-desktopAuthModal'}
            `}
            >
                <h1 className={`font-bold mt-10 ml-5 text-2xl`}>Sign in</h1>
                <Form
                    className={'mt-5 relative left-4'}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    disabled={isFormDisabled}
                    autoComplete="off"
                >
                    {/*Email block*/}
                    <Form.Item<AuthField>
                        name="email"
                        rules={[{required: true, message: 'email required!'}, {
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email format!',
                        },]}
                    >
                        <Input placeholder={'Email'}/>
                    </Form.Item>
                    {/*Password block*/}
                    <Form.Item<AuthField>
                        className={'mt-10'}
                        name="password"
                        rules={[{required: true, message: 'password required!'}]}
                    >
                        <Input.Password placeholder={'Password'}/>
                    </Form.Item>
                    {/*//Captcha block*/}
                    {isCaptchaRequired && <>
                        <div className={'w-full flex justify-center'}>
                            <img className={'h-20'}
                                 src={captchaUrl}
                                 alt="captcha url"/>
                        </div>
                        {/*//Captcha*/}
                        <Form.Item
                            name="captcha"
                            rules={[{required: true, message: 'Please input the captcha you got!'}]}
                        >
                            <Input placeholder={'Captcha'}/>
                        </Form.Item>
                    </>}
                    {/*//Remember me block*/}
                    <Form.Item<AuthField>
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {/*//Submit button*/}
                    <Form.Item>
                        <Button type="primary" className={`
                                  bg-blue-400
                                  w-full
                                  `}
                                htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <div className={'text-center w-full mt-5 text-red-500'}>{authError}</div>
                </Form>
            </div>
        </div>
    );

};

export default Auth;