import React from "react";
import { useNavigate } from "react-router-dom";


export const IrToProfile: React.FC = () => {
    const navigate = useNavigate();

    const manejarEnvio = (): void => {
        navigate('profile');
    }
    return (
    <div>
        <button onClick={manejarEnvio}>Ir Profile</button>
    </div>
    )
}