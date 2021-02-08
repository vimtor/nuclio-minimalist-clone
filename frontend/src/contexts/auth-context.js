import {createContext, useReducer, useState} from 'react'
import ky from "ky";
import {getUserIdFromToken} from "../helpers/token";

const api = 'http://localhost:3001'

export const AuthContext = createContext({
    loading: false,
    logged: false,
    userId: null,
    token: null,
    register: () => {},
    login: () => {},
    logout: () => {}
})

const token = localStorage.getItem("token");

const initialState = {
    loading: false,
    token: token || null,
    logged: token !== null,
    userId: token ? getUserIdFromToken(token) : null,
}

const reducer = (state, action) => {
  switch (action.type) {
      case 'loading':
          return {
              ...state,
              loading: true,
          }
      case 'login':
          return {
              token: action.token,
              userId: getUserIdFromToken(action.token),
              logged: true,
              loading: false
          }
      case 'logout':
          return initialState;
  }
}

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const register = async ({email, password}) => {
        dispatch({type: 'loading'})
        const {data} = await ky.post(`${api}/register`, {json: {email, password}}).json()
        dispatch({type: 'login', token: data.token})
        localStorage.setItem('token', data.token)
    }

    const login = async ({email, password}) => {
        dispatch({type: 'loading'})
        const {data} = await ky.post(`${api}/login`, {json: {email, password}}).json()
        dispatch({type: 'login', token: data.token})
        localStorage.setItem('token', data.token)
    }

    const logout = () => {
        dispatch({type: 'logout'})
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{...state, token, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

