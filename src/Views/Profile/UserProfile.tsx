import React from "react";
import { useAuth } from "@/Hooks/UserAuth";
import { ButtonVolver } from "@/Components/Ui/ButtonVolver";
import { UserCard } from "@/Components/Ui/UserCard";
import { Login } from "@/Components/Ui/Login";

export const UserProfile: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    return (
    <div className="dark:bg-[#333] h-screen w-screen dark:text-white">
        <div>
            <ButtonVolver />
        </div>
        <h2>Mi Profile</h2>
        {isAuthenticated && user ? (
            <div className="flex flex-col items-center gap-4">
                <span>Hello, {user.username}</span>
                <UserCard />
                <button onClick={logout} className="w-60 bg-[#48e] py-2 rounded text-white">Cerrar Sesion</button>
            </div>
        ) : (
            <div>
                <span>Por favor, inicia sesion</span>
                <Login />
            </div>
        )}
    </div>
    )
}