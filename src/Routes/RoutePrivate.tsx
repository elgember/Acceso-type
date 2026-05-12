import { User } from "@/interfaces/user_interface"
import { isAdmin } from "@/utils/TypeGuads";
import { Navigate, Outlet } from "react-router-dom"

interface RoutePrivateProps {
    user: User | null;
    requiredAdmin?: boolean;
}

export const RoutePrivate = ({ user, requiredAdmin = false }: RoutePrivateProps) => {
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredAdmin && !isAdmin(user)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}