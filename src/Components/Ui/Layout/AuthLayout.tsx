import { Outlet } from "react-router-dom"
import { Login } from "../Login"


export const AuthLayout = () => {
    return (
    <div>
        <h2>Welcome to the Auth Layout</h2>
        <p>Please log in to access the application.</p>
        <div>
            <Outlet />
        </div>
    </div>
    )
}