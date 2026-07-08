import { UserRole } from "@/interfaces/user_interface";
import { button } from "framer-motion/client";

interface UsersRoleProps {
    filterRole: UserRole | 'all';
    setFilterRole: (value: UserRole | 'all') => void;
    setCurrentPage: (value: number) => void;
}

export const UsersRole = ({ filterRole, setFilterRole, setCurrentPage }: UsersRoleProps) => {
    return (
    <div className="flex justify-center w-full sm:max-w-5xl">
        {[
            { id: 'all', label: 'Todos'},
            { id: 'admin', label: 'Administradores'},
            { id: 'iditor', label: 'Editores'},
            { id: 'guest', label: 'Invitados'},
        ].map((tab) => (
            <button key={tab.id} onClick={() => { setFilterRole(tab.id as UserRole | 'all'); setCurrentPage(1) }} className={`px-4 py-2 w-full rounded cursor-pointer ${filterRole === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {tab.label}
            </button>
        ))}
    </div>
    )
}