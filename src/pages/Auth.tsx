import React, {useState} from 'react';
import authStore from "../mobx/auth/auth";
import {Button, Checkbox, Form, Input} from "antd";
import {Navigate} from "react-router-dom";
import {profileRoute} from "../common";

interface authContainerProps {
    smallScreenMode: boolean;
    isLogged: boolean;
}

const Auth: React.FC<authContainerProps> = ({smallScreenMode, isLogged}) => {


    type FieldType = {
        email?: string;
        password?: string;
        remember?: string;
        captcha?: string;
    };

    const onFinish = (values: any) => {
        debugger
        setIsFormDisabled(true);
        authStore.signIn(values.email, values.password, values.remember, values.captcha)
            .finally(() => {
                setIsFormDisabled(false);
                setIsErrorVisible(true); // Показываем ошибку
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false); // Добавляем состояние для видимости ошибки


    const authError: string = authStore.authErrorText;
    const isAuthError: boolean = authError !== "";
    const isCaptchaRequired = authStore.isCaptchaRequired;
    const captchaUrl: string = authStore.captchaUrl;

    if (isLogged) {
        return <Navigate to={profileRoute}/>;
    }

    return (
        //Main block
        <div
            className={`
        flex 
        h-auto
        items-center 
        justify-center
        ${smallScreenMode ? "h-screen w-screen"
                : "w-auth translate-y-1/2 h-auth container mx-auto p-3"}
      `}
        >
            {/*//Left sign up block*/}
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
            {/*Right sign in block*/}
            <div
                className={`
            relative
            w-full 
            flex 
            justify-center
            items-center
            rounded-r-md
            flex-col 
            bg-white
            ${smallScreenMode ? "rounded-l-md h-1/2 justify-center" : "bg-white h-full justify-start "}
            `}
            >
                {/*//Sign in title*/}
                <h2 className={`text-3xl font-bold text-center ${!smallScreenMode && 'mb-8 mt-10'}`}>Sign in</h2>
                {isAuthError && (
                    <p className={`
                    mt-1
                    text-red-500 
                    w-full             
                    text-center              
                    transition-all duration-500
                    `}>{authError}</p>
                )}
                {isCaptchaRequired && (
                    <p className={`
                    mt-1
                    text-red-500 
                    w-full             
                    text-center              
                    transition-all duration-500
                    `}>{'Too many incorrect login attempts, please solve captcha to continue'}</p>
                )}
                {/*// From*/}
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/*Email block*/}
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'email required!'}, {
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email format!',
                        },]}
                    >
                        <Input/>
                    </Form.Item>
                    {/*Password block*/}
                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'password required!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    {/*//Captcha block*/}
                    {isCaptchaRequired && <>
                        <div className={'w-full flex justify-center'}>
                            <img className={'h-20'}
                                 src={captchaUrl}
                                 alt="captcha url"/>
                        </div>
                        <Form.Item
                            name="captcha"
                            label={'Captcha'}
                            rules={[{required: true, message: 'Please input the captcha you got!'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </>}
                    {/*//Remember me block*/}
                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{offset: 8, span: 16}}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {/*//Submit button*/}
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" className={'bg-blue-400'} htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Auth;