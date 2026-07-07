import { Outlet } from "react-router-dom"


export const AuthLayout = () => {
    return (
    <div className="h-full w-full dark:bg-[#333] dark:text-white text-center p-2">
        <h2>Welcome to the Auth Layout</h2>
        <p>Please log in to access the application.</p>
        <div>
            <Outlet />
        </div>
    </div>
    )
}