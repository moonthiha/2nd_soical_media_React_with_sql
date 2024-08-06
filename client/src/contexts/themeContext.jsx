import { Children, createContext, useEffect, useState } from "react";

export const DarkContext = createContext();

const DarkContextProvider = ({children}) => {
    const [darkMode,setDarkMode] = useState(
        JSON.parse(localStorage.getItem('darkMode')) || false
    );

    const toogle = () => {
        setDarkMode(!darkMode)
    };

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    },[darkMode]);

    return(
        <DarkContext.Provider value={{darkMode,toogle}}>
            {children}
        </DarkContext.Provider>
    );
}

export default DarkContextProvider;