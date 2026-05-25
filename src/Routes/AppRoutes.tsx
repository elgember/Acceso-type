import { RoutePrivate } from "./RoutePrivate";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { User } from "@/interfaces/user_interface";
import { Layout } from "@/Components/Ui/Layout/Layout";
import { useAuth } from "@/Hooks/UserAuth";
import { AuthLayout } from "@/Components/Ui/Layout/AuthLayout";

const currentUser: User = {id: 1, username: 'Alice', role: 'admin', permissions: ['read', 'write'], backendAccess: true, login: 'alice_dev', avatar_url: 'https://github.com/images/alice.pgn',
    html_url: 'htpps://github.com/alice', type: 'User', email: 'alice@example.com'
 };

const Dashboard = lazy(() => import("../Views/Dashboard").then(module => ({ default: module.Dashboard })));
const UserProfile = lazy(() => import('@/Views/Profile/UserProfile').then(module => ({ default: module.UserProfile })));
const AdminPanel = lazy(() => import('../Views/Admin/AdminPanel').then(module => ({ default: module.AdminPanel })));
const login = lazy(() => import('../Components/Ui/Login').then(module => ({default: module.Login})));

    const Login = () => <div>Pagina del login</div>
    const NotFound = () => <div>404 - Página no encontrada</div>


export const AppRoutes = () => {

    const {user, login} = useAuth();

    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
                <Route element={!user ? <AuthLayout /> : <Navigate to='/' replace />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<RoutePrivate user={currentUser} requiredAdmin={false} />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="profile" element={<UserProfile />} />
                    </Route>
                </Route>
                <Route element={<RoutePrivate user={currentUser} requiredAdmin={true}/> }>
                    <Route element={<Layout />}>
                        <Route path="admin" element={<AdminPanel />} />
                    </Route>
                </Route>
                    <Route path="*" element={<NotFound />} /> 
            </Routes>
        </Suspense>
    )
}