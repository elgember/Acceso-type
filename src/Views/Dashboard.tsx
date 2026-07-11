import { Card } from "@/Components/Ui/Card";
import { IrToAdminPanel } from "@/Components/Ui/IrToAdminPanel";
import { ThemeToggle } from "@/Components/Ui/ThemeToggle";
import { authContext } from "@/Context/AuthContext";


export const Dashboard = () => {
    const { user } = authContext();
    return (
    <div className="p-10 bg-white dark:bg-[#333] text-black dark:text-white min-h-full flex justify-center">
        <div>
            <h1 className="text-center py-2">Bienvenido a dashboard</h1>
            <ThemeToggle />
            <Card user={user ?? undefined} />
            <div>
                {user?.role === 'admin' ? (
                    <IrToAdminPanel />
                ) : (
                    null
                )}
            </div>
        </div>
    </div>
    )
}

