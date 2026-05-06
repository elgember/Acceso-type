import { ThemeToggle } from "@/Components/Ui/ThemeToggle"

export const Dashboard = () => {
    return (
    <div className="p-10 bg-white dark:bg-amber-950 text-black dark:text-white min-h-screen">
        <h1>Bienvenido a dashboard</h1>
        <ThemeToggle />
    </div>
    )
}