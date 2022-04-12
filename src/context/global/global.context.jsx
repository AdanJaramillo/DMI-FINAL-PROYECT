import React, {createContext, useState} from "react";

const initialState = {
    user: null,
    colorDefault: "#1432E5",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children}) =>{
    const [state, setState] = useState(initialState);

    function login (){
        const user = { name: "Adan", lastname: "Jaramillo"};

        setState((current)=>({...current, user}));
    }

    function logout (){
        setState((current)=>({...current, user:null}));
    }

    return(
        <GlobalContext.Provider value={{ state, login, logout }}>
            {children}
        </GlobalContext.Provider>
        
    );
};