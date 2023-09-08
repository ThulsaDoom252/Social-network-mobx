import React from 'react';
import {Navigate} from 'react-router-dom';
import {authRoute, profileRoute} from '../common';

interface AuthHocProps {
    isLogged: boolean;
}

const authHoc = <P extends AuthHocProps>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        if (props.isLogged) {
            return <Component {...props} />;
        } else {
            return <>
                <Navigate to={authRoute}/>.
            </>
        }
    };
};

export default authHoc;