import { createContext, useState, useEffect } from "react";
import { createUserData, onAuthObserver } from "../fbase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] =  useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(()=> {
        const unsubscribe = onAuthObserver((user)=>{
            if (user) {
                createUserData(user)
            }
            setCurrentUser(user);

        return unsubscribe;
        })

    })

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}