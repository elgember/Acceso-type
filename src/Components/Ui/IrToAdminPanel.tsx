import React from "react";
import { useNavigate } from "react-router-dom"


export const IrToAdminPanel: React.FC = () => {

    const navigate = useNavigate();

    const manejarEnvio = (): void => {
        navigate('admin');
    }
    return (
    <div className="mt-3">
        <button className="cursor-pointer border w-sm py-1 rounded text-center transform hover:scale-105" onClick={manejarEnvio}>Ir Admin Panel</button>
    </div>
    )
}