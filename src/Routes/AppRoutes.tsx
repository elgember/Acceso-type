import { RoutePrivate } from "./RoutePrivate"
import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { User } from "@/interfaces/user_interface"
import { Layout } from "@/Components/Ui/Layout/Layout"

const currentUser: User = {id: 1, username: 'Alice', role: 'admin', permissions: ['read', 'write'], backendAccess: true, login: 'alice_dev', avatar_url: 'https://github.com/images/alice.pgn',
    html_url: 'htpps://github.com/alice', type: 'User', email: 'alice@example.com'
 };

const Dashboard = lazy(() => import("../Views/Dashboard").then(module => ({ default: module.Dashboard })));
const UserProfile = lazy(() => import('@/Views/Profile/UserProfile').then(module => ({ default: module.UserProfile })));

    const Login = () => <div>Pagina del login</div>
    const NotFound = () => <div>404 - Página no encontrada</div>


export const AppRoutes = () => {

    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<RoutePrivate user={currentUser} requiredAdmin={false} />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="profile" element={<UserProfile />} />
                    </Route>
                </Route>
                    <Route path="*" element={<NotFound />} /> 
            </Routes>
        </Suspense>
    )
}