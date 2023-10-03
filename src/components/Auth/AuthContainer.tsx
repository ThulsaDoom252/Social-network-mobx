import React, {useState} from 'react';
import authStore from "../../mobx/auth/auth";
import {Navigate} from "react-router-dom";
import {profileRoute} from "../../common";
import Auth from "./Auth";

interface authContainerProps {
    smallScreenMode: boolean;
    isLogged: boolean;
    currentUserId:number
}

const AuthContainer: React.FC<authContainerProps> = ({smallScreenMode, isLogged, currentUserId}) => {

    const onFinish = (values: any) => {
        setIsFormDisabled(true);
        authStore.signIn(values.email, values.password, values.remember, values.captcha)
            .finally(() => {
                setIsFormDisabled(false);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [isFormDisabled, setIsFormDisabled] = useState(false);

    const authError: string = authStore.authErrorText;
    const isAuthError: boolean = authError !== "";
    const isCaptchaRequired = authStore.isCaptchaRequired;
    const captchaUrl: string = authStore.captchaUrl;

    if (isLogged) {
        return <Navigate to={`${profileRoute}/${currentUserId}`}/>
    }

    return (
        <Auth
            smallScreenMode={smallScreenMode}
            isAuthError={isAuthError}
            isCaptchaRequired={isCaptchaRequired}
            isFormDisabled={isFormDisabled}
            authError={authError}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            captchaUrl={captchaUrl}/>
    )


};

// @ts-ignore
export default AuthContainer