import {createContext, useState} from 'react'
import ky from "ky";

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
    const [userId, setUserId] = useState(null)
    const [logged, setLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)

    const register = async ({email, password}) => {
        setLoading(true)
        const {data} = await ky.post(`${api}/register`, {json: {email, password}}).json()
        setUserId(data.user._id)
        setToken(data.token)
        setLogged(true)
        setLoading(false)
    }

    const logout = () => {
        setToken(null)
        setLogged(false)
        setUserId(null)
    }

    return (
        <AuthContext.Provider value={{userId, logged, loading, token, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

