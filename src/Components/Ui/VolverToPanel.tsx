import React from "react";
import { useNavigate } from "react-router-dom"


export const VolverToPanel: React.FC = () => {

    const navigate = useNavigate();

    const regresarPanel = (): void => {
        navigate('/admin');
    }

    return (
    <div>
        <button className="" onClick={regresarPanel}>volver</button>
    </div>
    )
}