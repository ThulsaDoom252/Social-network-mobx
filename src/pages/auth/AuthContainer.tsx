import React from 'react';
import Auth from "./Auth";
import authHoc from "../../hoc/authHoc";
import {SubmitHandler, useForm} from "react-hook-form";

interface authContainerProps {
    smallScreenMode: boolean,
    isLogged: boolean,
}

const AuthContainer: React.FC<authContainerProps> = ({smallScreenMode, isLogged}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // Здесь вы можете использовать данные формы, включая email и пароль
        console.log(data.email, data.password);
    }

    console.log(register)

    return (
        <div>
            <Auth
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                smallScreenMode={smallScreenMode}
            />
        </div>
    );
};

export default authHoc(AuthContainer);