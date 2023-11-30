/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({children}) {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate("/");
        }
    }, [user])

    return <UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>
}