import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom"


export const VolverToPanel: React.FC = () => {

    const navigate = useNavigate();

    const regresarPanel = (): void => {
        navigate('/admin');
    }

    return (
    <div>
        <button className="transform hover:scale-110 cursor-pointer" onClick={regresarPanel}>
            <Icon className="text-slate-700" icon='fe:arrow-left' width="26" height="26"/>
        </button>
    </div>
    )
}