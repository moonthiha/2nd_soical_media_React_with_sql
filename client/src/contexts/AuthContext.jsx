import { createContext, useEffect, useState } from "react";


export const AuthUser = createContext();

const AuthUserProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    },[currentUser]);

    return(
        <AuthUser.Provider value={{updateUser,currentUser}}>
            {children}
        </AuthUser.Provider>
    );
}

export default AuthUserProvider;
