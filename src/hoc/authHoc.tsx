import React from 'react';
import { Navigate } from 'react-router-dom';
import {authRoute} from '../common';

// Define a Props interface for the AuthHoc component
interface AuthHocProps {
    isLogged: boolean;
}

// Create an AuthHoc Higher-Order Component (HOC) function
const authHoc = <P extends AuthHocProps>(Component: React.ComponentType<P>) => {
    // Return a new component
    return (props: P) => {
        // Check if the user is logged in
        if (props.isLogged) {
            // If logged in, render the provided Component with its props
            return <Component {...props} />;
        } else {
            // If not logged in, redirect to the authentication route
            return <>
                <Navigate to={authRoute} />.
            </>
        }
    };
};

export default authHoc;
