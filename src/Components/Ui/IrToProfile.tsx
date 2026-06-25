import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";


export const IrToProfile: React.FC = () => {
    const navigate = useNavigate();

    const manejarEnvio = (): void => {
        navigate('profile');
    }
    return (
    <div>
        <button className="cursor-pointer" onClick={manejarEnvio}>
            <Icon icon='iconamoon:profile-fill' width="32" height="32" />
        </button>
    </div>
    )
}