import { RoutePrivate } from "./RoutePrivate";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "@/Components/Ui/Layout/Layout";
import { useAuth } from "@/Hooks/UserAuth";
import { AuthLayout } from "@/Components/Ui/Layout/AuthLayout";
import { UserCard } from "@/Components/Ui/UserCard";
import { Card } from "@/Components/Ui/Card";
import { ProfileDetalle } from "@/Views/Profile/ProfileDetalle";

const Dashboard = lazy(() => import("../Views/Dashboard").then(module => ({ default: module.Dashboard })));
const UserProfile = lazy(() => import('@/Views/Profile/UserProfile').then(module => ({ default: module.UserProfile })));
const AdminPanel = lazy(() => import('../Views/Admin/AdminPanel').then(module => ({ default: module.AdminPanel })));
const Login = lazy(() => import('../Components/Ui/Login').then(module => ({default: module.Login})));

const NotFound = () => <div>404 - Página no encontrada</div>


export const AppRoutes = () => {

    const {user, login} = useAuth();

    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
                <Route element={!user ? <AuthLayout /> : <Navigate to='/' replace />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<RoutePrivate user={user} requiredAdmin={false} />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="card" element={<Card user={user} /> } />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="userCard" element={<UserCard user={user} /> } />
                    </Route>
                </Route>
                <Route element={<RoutePrivate user={user} requiredAdmin={true}/> }>
                    <Route element={<Layout />}>
                        <Route path="admin" element={<AdminPanel />} />
                        <Route path="profileAdmin/:id" element={<ProfileDetalle /> } />
                    </Route>
                </Route>
                    <Route path="*" element={<NotFound />} /> 
            </Routes>
        </Suspense>
    )
}