import { useParams } from "react-router-dom";
import { users } from '@/utils/TypeGuads';

export const ProfileDetalle = () => {
    // Obtener el ID del usuario desde los parámetros de la URL
    const { id } = useParams<{ id: string }>();

const user = users.find(u => u.id === Number(id)); // Obtener el usuario desde la lista de usuarios

    if (!user) {
        return <div>Usuario no encontrado</div>;
    }

    return (
    <div className="p-2">
        <h1 className="text-center p-2">Detalle del Usuario</h1>
        <ul>
            <li>Nombre: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Rol: {user.role}</li>
            <li>Permisos: {user.permissions?.join(', ')}</li>
            <li>Avatar: {user.avatar_url}</li>
            <li>Perfil: {user.html_url}</li>
        </ul>
    </div>
    )
}