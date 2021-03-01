import React from "react";
import {Route, Redirect} from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const ProtectedLogged = ({component: Component, ...rest}) => {
    const {logged} = useAuth();
    return (
        <Route
            {...rest}
            render={props => {
                if (logged) {
                    return <Redirect to="/lists" />
                }
                return <Component {...props} />
            }}
        />
    )
}

export default ProtectedLogged;
