import {createContext, useState} from 'react'
import ky from "ky";
import {getUserIdFromToken} from "../helpers/token";

const api = 'http://localhost:3001'

export const AuthContext = createContext({
    logged: false,
    userId: null,
    token: null,
    register: () => {},
    login: () => {},
    logout: () => {}
})

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [logged, setLogged] = useState(token !== null)
    const [userId, setUserId] = useState(token ? getUserIdFromToken(token) : null)
    const [loading, setLoading] = useState(false)

    const register = async ({email, password}) => {
        setLoading(true)
        const {data} = await ky.post(`${api}/register`, {json: {email, password}}).json()
        setUserId(getUserIdFromToken(data.token))
        setToken(data.token)
        setLogged(true)
        setLoading(false)
        localStorage.setItem('token', data.token)
    }

    const logout = () => {
        setToken(null)
        setLogged(false)
        setUserId(null)
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{userId, logged, loading, token, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

