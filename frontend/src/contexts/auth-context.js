import React from "react";
import {createContext, useReducer} from "react";
import {getUserIdFromToken} from "../helpers/token";
import api from "../helpers/api";

export const AuthContext = createContext({
    loading: false,
    logged: false,
    userId: null,
    register: () => {
    },
    login: () => {
    },
    logout: () => {
    },
});

const token = localStorage.getItem("token");

const initialState = {
    loading: false,
    logged: token !== null,
    userId: token ? getUserIdFromToken(token) : null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                loading: true,
            };
        case "login":
            return {
                userId: getUserIdFromToken(action.token),
                logged: true,
                loading: false,
            };
        case "logout":
            return {
                loading: false,
                logged: false,
                userId: null,
            };
        case "init":
            return {
                ...state,
                loading: false,
            }
    }
};

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const register = async ({email, password}) => {
        dispatch({type: "loading"});
        const token = await api.register({email, password});
        if (token) {    //TODO Review this code
            console.log(`After api.register ${JSON.stringify(initialState.loading)}`);
            dispatch({type: "login", token});
            console.log(`After dispatch ${JSON.stringify(initialState)}`);
            localStorage.setItem("token", token);
        } else
        {
            dispatch({type: "init"})
        }
    };

    const login = async ({email, password}) => {
        dispatch({type: "loading"});
        const token = await api.login({email, password});
        if (token) {
            dispatch({type: "login", token});
            localStorage.setItem("token", token);
        } else
        {
            dispatch({type: "init"})
        }
    };

    const logout = () => {
        dispatch({type: "logout"});
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{...state, token, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
