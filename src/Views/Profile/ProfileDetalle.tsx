import { useParams } from "react-router-dom";
import { useFetchUsers } from "@/Hooks/useFethUsers";
import {VolverToPanel} from '@/Components/Ui/VolverToPanel';


export const ProfileDetalle = () => {
    // Obtener el ID del usuario desde los parámetros de la URL
    const { id } = useParams<{ id: string }>();

    const { users, loading } = useFetchUsers(); // Obtener la lista de usuarios desde el hook useFetchUsers

const user = users.find(u => u.id === Number(id)); // Obtener el usuario desde la lista de usuarios

    if (!user) {
        return <div>Usuario no encontrado</div>;
    }

    if (loading) {
        return <div className="text-center">Cargando...</div>;
    }

    return (
    <div className="p-2">
        <VolverToPanel />
        <div>
            <h1 className="text-center p-2">Detalle del Usuario</h1>
        </div>
        <div>
            <ul>
                <li>Nombre: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Rol: {user.role}</li>
                <li>@{user.username}</li>
                <li>{user.name.charAt(0)}</li>
            </ul>
        </div>
    </div>
    )
}