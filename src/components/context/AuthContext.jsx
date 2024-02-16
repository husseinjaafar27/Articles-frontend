import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            // Decode the token to access its payload
            const decodedToken = jwtDecode(token);
            // Check if the token is expired
            if(decodedToken){
                setIsLogged(true);
            }else{
                    setIsLogged(false)
            }
               

        }
    }, []); 

    const Login = (token) => {
        localStorage.setItem('token', token);
        setIsLogged(true)
    }

    const value = {
        isLogged,
        setIsLogged,
        Login
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
