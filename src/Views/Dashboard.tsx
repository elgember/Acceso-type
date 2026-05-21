import { Card } from "@/Components/Ui/Card";
import { ThemeToggle } from "@/Components/Ui/ThemeToggle";

export const Dashboard = () => {
    return (
    <div className="p-10 bg-white dark:bg-[#333] text-black dark:text-white min-h-screen">
        <h1>Bienvenido a dashboard</h1>
        <ThemeToggle />
        <Card user={{id: 1, username: 'Alice', role: 'admin', backendAccess: true, permissions: ['read', 'write']}} />
    </div>
    )
}