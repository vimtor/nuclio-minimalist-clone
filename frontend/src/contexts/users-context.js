import React from "react";
import {createContext, useEffect, useState} from 'react'
import useAuth from "../hooks/use-auth";
import api from '../helpers/api'
import {getUserIdFromToken} from "../helpers/token";

export const UsersContext = createContext({
    activeUser: null,
    alias: null,
    avatar: null,
    updateProfile: () => {},
})

const UsersProvider = ({children}) => {
    const {token} = useAuth();
    const [activeUser, setActiveUser] = useState(token ? getUserIdFromToken(token) : null)
    const [alias, setAlias] = useState(null);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        api.fetchOneUser(activeUser).then((data) => {
            setActiveUser(data._id);
            setAlias(data.alias);
            setAvatar(data.avatar);
        })
    }, [])

    const updateProfile = async (userId, newAlias, newAvatar) => {
        await api.updateUserProfile(activeUser, newAlias, newAvatar)
        setAlias(newAlias);
        setAvatar(newAvatar);
    }

    return (
        <UsersContext.Provider value={{activeUser, alias, avatar, updateProfile}}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider

