import React from "react"
import { useNavigate } from "react-router-dom"

export const ButtonVolver: React.FC = () => {
    const navigate = useNavigate();

    const manejarVolver = (): void => {
        navigate(-1);
    }

    return (
    <div>
        <button onClick={manejarVolver}>
            Volver
        </button>
    </div>
    )
}