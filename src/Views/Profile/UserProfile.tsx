import React from "react";
import { useAuth } from "@/Hooks/UserAuth";
import { ButtonVolver } from "@/Components/Ui/ButtonVolver";

export const UserProfile: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    return (
    <div>
        <ButtonVolver />
        <h2>Mi Profile</h2>
        {isAuthenticated && user ? (
            <div>
                <span>hello, {user.username}</span>
                <button onClick={logout}>Cerrar Sesion</button>
            </div>
        ) : (
            <span>Por favor, inicia sesion</span>
        )}
    </div>
    )
}