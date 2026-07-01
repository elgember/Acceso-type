import { User } from "@/interfaces/user_interface";
import { Link } from "react-router-dom"

interface props {
    sortOrder: string;
    users: User[];
    onSortToggle: () => void;
    handleEditClick: (user: User) => void;
    handleDeleteClick: (id: number) => void;
}

export const UserTable = ({users, sortOrder, onSortToggle, handleEditClick, handleDeleteClick }: props) => {

    return (
    <div className="w-full">
            <table className="min-w-3xl w-full table-auto border-collapse text-sm">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
                        <th className="px-6 py-3 font-semibold" onClick={onSortToggle}>Name</th>
                        <th className="px-6 py-3 font-semibold">Email</th>
                        <th className="px-6 py-3 font-semibold">Role</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-3 font-medium text-slate-900 dark:text-white text-justify">
                                <div className="flex flex-col">
                                    <span>{user.name}</span>
                                    <span className="text-xs text-slate-400">@{user.username}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-justify">
                                <span>{user.email}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className={`inline-flex items-center uppercase rounded-md px-2 py-1 text-xs font-bold ring ring-inset cursor-pointer ${user.role === 'admin' ? 'bg-red-50 text-red-700 ring-600/10 dark:bg-red-500/50 dark:text-red-400' : user.role === 'editor' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-700 ring-red-600-10' : 'bg-slate-50 text-slate-600 ring-slate-500/10 dark:bg-slate-500/10 dark:text-slate-400' }`} onClick={() => handleEditClick(user)}>
                                    {user.role}
                                </button>
                            </td>
                            <td className="px-6 py-4 text-center space-x-3">
                                <Link className="" to={`/profileDetalle/${user.id}`}>
                                    <span>Perfile</span>
                                </Link>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="cursor-pointer" onClick={() => handleDeleteClick(user.id)}>Eliminar</button>
                            </td>
                    </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center px-6 py-4 text-white bg-slate-700 font-bold">
                                No se encontraron usuario
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}