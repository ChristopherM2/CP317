'use client';
import React from 'react'
import { createContext, ReactNode, useState, useContext } from 'react';

interface User{
    email: string;
    password: string;
    id: string;
}

interface AuthContextType{
    isAuthenticated:boolean;
    user:User | null;
    login : (user : User) => void;
    logout : () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    //document.body.style.overflow = 'hidden';

    
    const login = async(user:User) =>{
        console.log("login initiated by: ", user.id)
        setUser(user);
        setIsAuthenticated(true);
    }

    const logout = () =>{
        setUser(null);
        setIsAuthenticated(false);
    }
    


    return (
        <AuthContext.Provider value= {{isAuthenticated, user, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
    return undefined;
  }
  return context;
};


export default AuthContext
