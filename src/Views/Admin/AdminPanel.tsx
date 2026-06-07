import { useFetchUsers } from '@/Hooks/useFethUsers';
import { Icon } from '@iconify/react';
import { use, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


export const AdminPanel = () => {
    const { users, setUsers, loading } = useFetchUsers();

    const location = useLocation();

    const [sortOder, setSortOder] = useState('asc');

    const [searchTerm, setSearchTerm] = useState('');

    // State to manage the visibility of the user details modalf
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to hold the ID of the user to be deleted
    const [userToDelete, setUserToDelete] = useState<number | null>(null);


    const filteredUsers = users.filter((user) => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setIsModalOpen(true);
    }
        const confirmarDelete = () => {
            if (userToDelete !== null) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
                setIsModalOpen(false);
                setUserToDelete(null);
            }
        }
        const cancelarDelete = () => {
            setIsModalOpen(false);
            setUserToDelete(null);
    }


    if (loading) {
        return (
            <div className='w-full min-h-screen dark:bg-[#333] p-6'>
                <div className='h-8 w-48 mb-6 animate-pulse'></div>
                <div className='max-w-5xl mx-auto'>
                    <div className='w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 rounded-lg'>
                        {Array(10).fill(0).map((_, index) => (
                            <div key={index} className='flex border-b border-gray-200 dark:border-gray-800 py-4 animate-pulse'>
                                <div className='h-5 w-32 bg-slate-200 dark:bg-gray-700 rounded'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    } 

    return (
    <div className='w-full min-h-screen dark:bg-[#333] dark:text-white relative'>
        <div className='text-center'>
            <h2>Admin Panel</h2>
            <p>Gestion de usuarios y configuraciones</p>
        </div>
        <div className='w-full max-w-md text-center dark:text-slate-400 mb-4 relative flex justify-center mx-auto'>
            <Icon icon='material-symbols:search-rounded' height="24" className='absolute left-1/13 top-1/2 transform -translate-y-1/2 md:max-w-md lg:max-w-lg' />
            <input type='text' placeholder='Buscar usuarios por nombre o email' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='w-sm bg-blue-50 py-1 pl-7 rounded' />
        </div>
        <div className='max-w-5xl mx-auto mb-8'>
            <div className='text-center mt-4'>
                <p>Lista de Usuarios</p>
                <p>{filteredUsers.length} Usuarios registrados</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <h2>Detalles del Usuario</h2>
                <div className='w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
                    <table className='min-w-3xl w-full table-auto text-left border-collapse text-sm'>
                        <thead>
                            <tr className='border-b border-slate-100 dark:border-slate-800-700 bg-slate-50 dark:bg-gray-800 dark:text-slate-400'>
                                <th className='px-6 py-3 font-semibold' onClick={() => setSortOder(sortOder === 'asc' ? 'desc' : 'asc')}>Name</th>
                                <th className='px-6 py-3 font-semibold'>Email</th>
                                <th className='px-6 py-3 font-semibold'>Role</th>
                                <th className='px-6 py-3 font-semibold'>Status</th>
                                <th className='px-6 py-3 font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.sort((a, b) => {
                                if (sortOder === 'asc') {
                                    return a.name.localeCompare(b.name);
                                }
                                return b.name.localeCompare(a.name);
                            }).map(user => (
                                <tr key={user.id} className='hover:bg-slate-50/50 dark:hover:hover:bg-slate-800/30 transition-colors'>
                                    <td className='px-6 py-4 font-medium text-slate-900 dark:text-white'>  
                                        <div className='flex flex-col'>
                                            <span>{user.name}</span>
                                            <span className='text-xs text-slate-400'>@{user.username || 'user'}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 text-justify'>
                                        <span>{user.email}</span>
                                    </td>
                                    <td className='px-6 py-4'>
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold uppercase ring-1 ring-inset ${user.role === 'admin' ? 'bg-red-50 text-red-700 ring-600/10 dark:bg-red-500/50 dark:text-red-400' : user.role === 'editor' ? 'bg-blue-50 text-blue-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400' : 'bg-slate-50 text-slate-600 ring-slate-500/10 dark:bg-slate-500/10 dark:text-slate-400'}`}>
                                                {user.role || 'guest'}
                                            </span>
                                    </td>
                                    <td className='px-6 py-4 text-center space-x-3'>
                                        <Link to={`/profileDetalle/${user.id}`} state={{ user }} className='text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline'>
                                            <span>
                                                Perfil
                                            </span>
                                        </Link>
                                    </td>
                                    <td className='px-6 py-4 text-center space-x-3'>
                                        <button onClick={() => handleDeleteClick(user.id)} className='text-xs font-semibold text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline cursor-pointer'>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className='px-6 py-4 text-center text-slate-500 dark:text-slate-400'>
                                        No se encontraron usuarios que coincidan con '{searchTerm}'.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50'>
                    <div className='max-w-sm w-full bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg'>
                        <p className='pb-3 text-slate-900 dark:text-white'>¿Estás seguro de que quieres eliminar este usuario?</p>
                        <div className='flex justify-center'>
                            <button onClick={confirmarDelete} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                                Eliminar
                            </button>
                            <button onClick={cancelarDelete} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2'>
                                Cancelar
                            </button>
                        </div>
                    </div> 
                </div>
            )}
        </div>
    </div>
    )
}