import {useContext} from "react";
import {AuthContext} from "../contexts/auth-context";

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error('The hook useAuth must be used within AuthProvider')
    }
    return context
}

export default useAuth
