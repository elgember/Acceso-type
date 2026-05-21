import { User } from "@/interfaces/user_interface";
import { AuthTypes } from "../interfaces/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthTypes | undefined>(undefined);

export const UserAuth: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user_data');
        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                setUser(null);
                console.error('Error al parsear los datops del usuario', error);
            }
        }
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');

        setUser(null);
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un userAuth');
    }
    return context;
}