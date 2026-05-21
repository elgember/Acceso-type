import { useAuth } from "@/Hooks/UserAuth";
import { User } from "@/interfaces/user_interface"
import { createContext, ReactNode, useContext } from "react";

interface AuthContextProps {
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthProvider = createContext<AuthContextProps | undefined>(undefined);

export const AuthContext = ({children} : {children: ReactNode}) => {
    const auth = useAuth();

    return (
    <AuthProvider.Provider value={auth}>
        {children}
    </AuthProvider.Provider>
    )
}

export const authContext = () => {
    const context = useContext(AuthProvider);
    if (!context) {
        throw new Error('Hubo un error authContextProvider');
    }
    return context;
}