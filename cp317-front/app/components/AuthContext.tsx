/*
This file handles the user logging in, gives each user a unique context
*/
'use client';
import React from 'react'
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';

interface User{ // user details that handle context
    email: string;
    password: string;
    id: string;
}

interface AuthContextType{ // Authentication context needs these core things
    isAuthenticated:boolean;
    user:User | null;
    login : (user : User) => void;
    logout : () => void;
}

// allows each page to fetch context, (user id/token to run api calls)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect (() => isUserLoggedin(), []) // runs isuserloggedin

    // login sets the authentication conext for the user using their id/token
    const login = async(user:User) =>{
        console.log("login initiated by: ", user.id)
        setUser(user);
        setIsAuthenticated(true);

        //store local info to persist user login
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
    }

    // removes auth context, and empties local storage
    const logout = () =>{
        setUser(null);
        setIsAuthenticated(false);

        //remove local info
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
    }

    const isUserLoggedin = () =>{
        //load local info if has any, (run at the start of a refresh for example)
        const storedUser = localStorage.getItem('user');
        const storedAuthStatus = localStorage.getItem('isAuthenticated');

        if (storedUser && storedAuthStatus === 'true') {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }
    

    // wrap every file's returns in authcontext, done in layout :)
    return (
        <AuthContext.Provider value= {{isAuthenticated, user, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext
