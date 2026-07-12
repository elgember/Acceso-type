import React from "react";
import { useNavigate } from "react-router-dom"


export const IrToAdminPanel: React.FC = () => {

    const navigate = useNavigate();

    const manejarEnvio = (): void => {
        navigate('/admin');
    }

    return (
    <div className="mt-3 flex justify-center w-full">
        <button className="cursor-pointer bg-blue-500 dark:bg-slate-800 text-white w-sm py-2 rounded text-center transform hover:scale-105" onClick={manejarEnvio}>Ir Admin Panel</button>
    </div>
    )
}