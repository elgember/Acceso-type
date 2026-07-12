import { Card } from "@/Components/Ui/Card";
import { IrToAdminPanel } from "@/Components/Ui/IrToAdminPanel";
import { ThemeToggle } from "@/Components/Ui/ThemeToggle";
import { authContext } from "@/Context/AuthContext";


export const Dashboard = () => {
    const { user } = authContext();
    return (
    <div className="p-10 bg-white dark:bg-[#333] text-black dark:text-white min-h-full w-full">
        <div className="w-full flex flex-col sm:items-center">
            <h1 className="sm:text-center text-start pl-6 py-4 font-semibold">Bienvenido a dashboard</h1>
            <div className="sm:w-sm sm:text-start pl-6">
                <ThemeToggle />
                <Card user={user ?? undefined} />
            </div>
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

