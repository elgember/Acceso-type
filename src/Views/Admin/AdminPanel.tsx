import { useFetchUsers } from '@/Hooks/useFethUsers';
import type { User } from '@/interfaces/user_interface';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserTable } from '@/Components/UserTable';
import { SearchUser } from '@/Components/SearchUser';
import { UserFormData, UserFormModal } from '@/Components/UserFormModal';
import { ConfirmationModal } from '@/Components/ConfirmationModal';
import { CurrentPages } from '@/Components/CurrentPages';
import { UsersRole } from '@/Components/Ui/UsersRole';
import { UserTableSkeleton } from '@/Components/UserTableSkeleton';
import { userUsersManager } from '@/Hooks/userUsersManager';
import { supabase } from '@/superbaseCliente';


export const AdminPanel = () => {
    const { users } = useFetchUsers();

    const { setUsers, loading, searchTerm, setSearchTerm, sortOrder, setSortOrder, filterRole, setFilterRole, currentPage, setCurrentPage, currentUser, totalPage, filteredUsers } = userUsersManager();

    const location = useLocation();

    //notificacion de confirmacion delete user
    const [notification, setNotification] = useState<string | null>(null);

    // State to manage the visibility of the user details modalf
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    // estdos para confirmacion de eliminacion
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    // State to hold the ID of the user to be deleted
    const [userToDelete, setUserToDelete] = useState<User | null>(null);


    // eliminar usuarios de la table 
    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModal(true);
    }
        const confirmarDelete = async () => {
            if (userToDelete !== null) {
                const { error } = await supabase
                    .from('users')
                    .delete()
                    .eq('id', userToDelete.id);

                if (!error) {
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
                }

                setNotification('Usuaraio Eliminado');
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            } else {
                console.error('No se pudo eliminar el usuario: ID no encontrado');
            }
            setIsDeleteModal(false);
            setUserToDelete(null);
        }
        
        const cancelarDelete = () => {
            setIsDeleteModal(false);
            setUserToDelete(null);
    }

    // agregar usuario en la table 
    const handleAddClick = () => {
        setUserToDelete(null);
        setIsFormModalOpen(true);
    }

    const handleEditClick = (user: User) => {
        setUserToDelete(user);
        setIsFormModalOpen(true);
    }

        // guardar o crear usuario en la tabla si hay id
    const handleSeveUser = async (data: UserFormData) => {
        
        if (userToDelete) {
            const { error } = await supabase
                .from('users')
                .update({
                    name: data.name,
                    email: data.email,
                    role: data.role
                })
                .eq('id', userToDelete.id);

            if (!error) {
                setUsers(prev => prev.map(user => user.id === userToDelete.id ? { ...user, ...data } : user));
            } else {
               console.error('Error al actualizar usuario:', error.message);
        }
            } else {
                const generatedId = data.name.toLowerCase().replace(/\s+/g, '-');

                const { data: newUser, error } = await supabase
                    .from('users')
                    .insert([{ 
                        name: data.name,
                        email: data.email,
                        role: data.role
                    }])
                    .select()
                    .single();
                    
                if (!error && newUser) {
                    setUsers(prev => [newUser as User, ...prev ]);
                } else {
                    console.error('Error al crear usuario:', error?.message);
                }
            }
            setIsFormModalOpen(false);
            setUserToDelete(null);
        }

        const handleCancelUser = () => {
            setIsFormModalOpen(false);
            setUserToDelete(null);
        }


    if (loading) {
        return <UserTableSkeleton />
    } 

    return (
    <div className='w-full min-h-screen dark:bg-[#333] dark:text-white relative'>
        <div className='text-center'>
            <h2>Admin Panel</h2>
            <p>Gestion de usuarios y configuraciones</p>
        </div>
        <div className='flex justify-center'>
            <SearchUser searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAddClick={handleAddClick} />
        </div>
        <div className='flex flex-col justify-center items-center gap-4 mt-4'>
            <div className='text-center mt-4'>
                <p>Lista de Usuarios</p>
                <p>{filteredUsers.length} Usuarios registrados</p>
            </div>
            <div className='gap-4 w-full max-w-5xl overflow-x-auto border border-gray-200 rounded-lg dark:border-gray-700'>
                <UserTable handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} users={currentUser} sortOrder={sortOrder} onSortToggle={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} />
            </div>
            {/* user deletion confirmation */}
            <div className='absolute top-1/3 w-full flex justify-center px-6 z-50'>
                <ConfirmationModal isOpen={isDeleteModal} onConfirmar={confirmarDelete} onCancelar={cancelarDelete} />
            </div>
            {/* modal to create or edit a user */}
            <div className='absolute top-1/5 z-50 w-full flex justify-center p-4'>
                <UserFormModal isOpen={isFormModalOpen} userToEdit={userToDelete} saveUser={handleSeveUser} cancelUser={handleCancelUser} />
            </div>
            <div className='w-full flex justify-center'>
                <AnimatePresence>
                {notification && (
                    <motion.div key='notification-toast' initial={{y: -50, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -50, opacity: 0}} className='dark:bg-slate-800 bg-[#48f] text-white rounded-3xl fixed top-2 z-30 h-sm w-60 text-center p-4 transform translate-y-1/2'>
                        <span>{notification}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
            <div className='flex justify-center w-full'>
                <CurrentPages totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <div className='w-full flex justify-center'>
                <UsersRole filterRole={filterRole} setFilterRole={setFilterRole} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    </div>
    )
}