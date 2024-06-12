import React, { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
import { BackendApi } from "../client/backend-api"



const UserContext = createContext({
    user: null,
    loginUser: () => { },
    registerUser: () => { },
})

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(user && user.role === 'admin')
    }, [user])

    useEffect(() => {
        BackendApi.user.getProfile().then(({ user, error }) => {
            if (error) {
                console.error(error)
            } else {
                setUser(user)
            }
        }).catch(console.error)
    }, [])

    const loginUser = async (username, password) => {
        const { user, error } = await BackendApi.user.login(username, password)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully")
            setUser(user)
        }
    }

    const registerUser = async (username, password, role) => {
        const { user, error } = await BackendApi.user.register(username, password, role)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Registered successfully")
            setUser(user)
        }
    }

    const logoutUser = async () => {
        setUser(null)
        await BackendApi.user.logout()
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, registerUser, isAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export { useUser, UserProvider }
