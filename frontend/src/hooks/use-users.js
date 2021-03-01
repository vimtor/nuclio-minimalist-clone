import {useContext} from "react";
import {UsersContext} from "../contexts/users-context";

const useUsers = () => {
    const context = useContext(UsersContext)
    if (!context) {
        throw Error('The hook useUsers must be used within UsersProvider')
    }
    return context
}

export default useUsers
