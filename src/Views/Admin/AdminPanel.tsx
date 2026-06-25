import { useFetchUsers } from '@/Hooks/useFethUsers';
import type { User, UserRole } from '@/interfaces/user_interface';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { div } from 'framer-motion/client';


export const AdminPanel = () => {
    const { users, setUsers, loading } = useFetchUsers();

    const location = useLocation();

    //notificacion de confirmacion delete user
    const [notification, setNotification] = useState<string | null>(null);

    const [sortOder, setSortOder] = useState('asc');

    const [searchTerm, setSearchTerm] = useState('');

    // State to manage the visibility of the user details modalf
    const [isModalOpen, setIsModalOpen] = useState(false);

    //modal to edit user
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    //estado de usuarios de la tabla
    const [isUserToEdit, setIsUserToEdit] = useState<User | null>(null);

    // estados de role de usuario
    const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

    // State to hold the ID of the user to be deleted
    const [userToDelete, setUserToDelete] = useState<number | null>(null);

//name end email filter for search engine
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = filterRole === 'all' || user.role === filterRole;

        return matchesSearch && matchesRole;
    });

    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setIsModalOpen(true);
    }
        const confirmarDelete = () => {
            if (userToDelete !== null) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
                setIsModalOpen(false);
                setUserToDelete(null);
                setNotification('Usuaraio Eliminado');
                setTimeout(() => {
                    setNotification(null);
                }, 3000)
            }
        }
        const cancelarDelete = () => {
            setIsModalOpen(false);
            setUserToDelete(null);
    }


    // editar usuario en la table
    const handleEditClick = (user: User) => {
        setIsUserToEdit(user);
        setIsEditModalOpen(true);
    }

        const editChangeUser = (campo: string, valor: string) => {
            if (isUserToEdit) {
                setIsUserToEdit({...isUserToEdit, [campo]: valor})
            }
        }

        const editChangeEmail = (campo: string, valor: string) => {
            if (isUserToEdit) {
                setIsUserToEdit({...isUserToEdit, [campo]: valor});
            }
        }

        const seveUser = () => {
            if (isUserToEdit) {
                setUsers(prevUsers => 
                    prevUsers.map(u => (u.id === isUserToEdit.id ? isUserToEdit : u))
                )
            }
            setIsEditModalOpen(false)
        }

        const cancelUser = () => {
            setIsUserToEdit(null);
            setIsEditModalOpen(false);
        }


        const [isAddToModalOpen, setIsAddToModalOpen] = useState(false);
        const [newUser, setNewUser] = useState<{name: string; email: string; role: UserRole }>({name: '', email: '', role: 'guest'})

        //agregar usuario 
        const clickAddChange = (campo: string, valor: string) => {
            setNewUser({ ...newUser, [campo]: valor})
        } 

        const saveUser = () => {
            if (newUser.name.trim() === '') return;

            const userToCreate = {
                id: Date.now(),
                name: newUser.name,
                email: newUser.email,
                username: newUser.name.toLowerCase().replace(/\s/g, '_'),
                role: newUser.role,
            }
            
            setUsers(prevUser => [userToCreate, ...prevUser])

            setIsAddToModalOpen(false)
            setNewUser({name: '', email: '', role: 'guest'})
        }

        //filter users by order
        const filteredUser = [...filteredUsers].sort((a, b) => {
            if (sortOder === 'asc') return a.name.localeCompare(b.name);
            return b.name.localeCompare(a.name);
        });

        // estados para paginas 
        const [currentPage, setCurrentPage] = useState(1);

        const usersPage = 5;

        const indexOfLastUser = currentPage * usersPage;
        const indexOfFirstUser = indexOfLastUser - usersPage;

        const currentUser = filteredUser.slice( indexOfFirstUser, indexOfLastUser);
        
        const totalPage = Math.ceil(filteredUser.length / usersPage);


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
                <button onClick={() => setIsAddToModalOpen(true)} className='bg-amber-300 py-1 px-2 text-black rounded'>agregar</button>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <h2>Detalles del Usuario</h2>
                <div className='w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
                    <table className='min-w-3xl w-full table-auto text-left border-collapse text-sm'>
                        <thead>
                            <tr className='border-b border-slate-100 dark:border-slate-800-700 bg-slate-50 dark:bg-gray-800 dark:text-slate-400'>
                                <th className='px-6 py-3 font-semibold cursor-pointer' onClick={() => setSortOder(sortOder === 'asc' ? 'desc' : 'asc')}>Name</th>
                                <th className='px-6 py-3 font-semibold'>Email</th>
                                <th className='px-6 py-3 font-semibold'>Role</th>
                                <th className='px-6 py-3 font-semibold'>Status</th>
                                <th className='px-6 py-3 font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUser.map(user => (
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
                                        <button className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold uppercase ring-1 ring-inset cursor-pointer ${user.role === 'admin' ? 'bg-red-50 text-red-700 ring-600/10 dark:bg-red-500/50 dark:text-red-400' : user.role === 'editor' ? 'bg-blue-50 text-blue-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400' : 'bg-slate-50 text-slate-600 ring-slate-500/10 dark:bg-slate-500/10 dark:text-slate-400'}`} onClick={() => handleEditClick(user)}>
                                            {user.role || 'guest'}
                                        </button>
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
                    <div className='min-w-sm w-full bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg'>
                        <p className='pb-6 text-slate-900 dark:text-white'>¿Estás seguro de que quieres eliminar este usuario?</p>
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
        {isEditModalOpen && isUserToEdit && (
        // modal para editar usuario del la table 
            <div className='absolute top-1/2 z-50 w-full flex justify-center'>
                <div className='bg-[#49e] dark:bg-slate-800 text-white dark:text-slate-500 w-md md:w-lg flex flex-col gap-2 py-4 px-6 text-center rounded-lg'>
                    <label>Editar Nombre de Usuario</label>
                    <input className='bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 rounded' type="text" value={isUserToEdit.name} onChange={(e) => editChangeUser('name', e.target.value)}/>
                    <input className='bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 rounded' type="text" value={isUserToEdit.email} onChange={(e) => editChangeEmail('email', e.target.value)} />
                    <div className='flex justify-center gap-6 pt-1'>
                        <button onClick={cancelUser} className='bg-white dark:bg-slate-500 text-black dark:text-slate-300 py-1 px-3 rounded-md cursor-pointer'>Cancelar</button>
                        <button onClick={seveUser} className='bg-white dark:bg-slate-500 text-black dark:text-slate-300 py-1 px-3 rounded-md cursor-pointer'>Aceptar</button>
                    </div>
                </div>
            </div>
        )}
            <div className='w-full flex justify-center'>
                <AnimatePresence>
                {notification && (
                    <motion.div key='notification-toast' initial={{y: -50, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -50, opacity: 0}} className='dark:bg-slate-800 rounded-3xl fixed top-2 z-30 h-sm w-60 text-center p-4 transform translate-y-1/2'>
                        <span>{notification}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
            {isAddToModalOpen && (
                <div className='absolute top-1/5 flex flex-col items-center gap-2 w-full'>
                    <div className='bg-white py-6 px-4 w-md rounded'>
                        <div className='flex flex-col w-90'>
                            <label className='text-black' htmlFor="nameId">Nombre del usuario</label>
                            <input className='border-b border-black text-black' type="text" value={newUser.name} onChange={(e) => clickAddChange('name', e.target.value)} id='nameId' />
                        </div>
                        <div className='flex flex-col w-90'>
                            <label className='text-black' htmlFor="emailId">Email del usuario</label>
                            <input className='border-b border-black text-black' type="text" value={newUser.email} onChange={(e) => clickAddChange('email', e.target.value)} id='emailId' />
                        </div>
                        <div className='flex flex-col gap-3 text-black'>
                            <label htmlFor="roleId">Role</label>
                            <select className='border rounded w-90 py-1' name="roleUser" id="roleId">
                                <option value="guest">guest</option>
                                <option value="editor">editor</option>
                                <option value="admin">administrador</option>
                            </select>
                        </div>
                        <div className='flex gap-6 justify-center pt-6'>
                            <button className='bg-red-500 py-1 px-2 rounded cursor-pointer' onClick={() => setIsAddToModalOpen(false)}>Cancelar</button>
                            <button className='bg-green-500 py-1 px-2 rounded cursor-pointer' onClick={saveUser}>Aceptar</button>
                        </div>
                    </div>
                </div>
            )}
            
            {totalPage > 0 && (
                <div className='w-full p-0 m-0'>
                    <div className='flex justify-between px-2 pb-6'>
                        <button className='cursor-pointer' onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1 ))} disabled={currentPage === 1}>Anterior</button>
                        <span>Pagina {currentPage} de {totalPage}</span>
                        <button className='cursor-pointer' onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage ))} disabled={currentPage === totalPage}>Siguente</button>
                    </div>
                </div>
            )}
            <div className='w-full flex'>
                {[
                    { id: 'all', label: 'todos'},
                    { id: 'admin', label: 'administradores'},
                    { id: 'editor', label: 'editores'},
                    { id: 'guest', label: 'invitados'},
                ].map((tab) => (
                    <button key={tab.id} onClick={() => { setFilterRole(tab.id as UserRole | 'all'); setCurrentPage(1)}} className={`px-4 py-2 w-full rounded cursor-pointer ${filterRole === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
    </div>
    )
}