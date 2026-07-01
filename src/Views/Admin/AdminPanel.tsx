import { useFetchUsers } from '@/Hooks/useFethUsers';
import type { User, UserRole } from '@/interfaces/user_interface';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserTable } from '@/Components/UserTable';
import { SearchUser } from '@/Components/SearchUser';
import { UserFormModal } from '@/Components/UserFormModal';
import { ConfirmationModal } from '@/Components/ConfirmationModal';
import { CurrentPages } from '@/Components/CurrentPages';
import { UsersRole } from '@/Components/Ui/UsersRole';
import { UserTableSkeleton } from '@/Components/UserTableSkeleton';

export const AdminPanel = () => {
    const { users, setUsers, loading } = useFetchUsers();

    const location = useLocation();

    //notificacion de confirmacion delete user
    const [notification, setNotification] = useState<string | null>(null);

    // user search
    const [searchTerm, setSearchTerm] = useState('');

     //estados para order user por abecedario
    const [sortOrder, setSortOrder] = useState('asc');

    // user search timer
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // State to manage the visibility of the user details modalf
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    //modal to edit user
    const [formData, setFormData] = useState<Partial <User>>({ name: '', email: '', role: 'guest'});

    // estados de role de usuario
    const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

    // estdos para confirmacion de eliminacion
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    // State to hold the ID of the user to be deleted
    const [userToDelete, setUserToDelete] = useState<number | null>(null);

    // pausa mientras el user escribe
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300)
        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    //name end email filter for search engine
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesRole = filterRole === 'all' || user.role === filterRole;

        return matchesSearch && matchesRole;
    });

    // eliminar usuarios de la table 
    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setIsDeleteModal(true);
    }
        const confirmarDelete = () => {
            if (userToDelete !== null) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
                setIsDeleteModal(false);
                setUserToDelete(null);
                setNotification('Usuaraio Eliminado');
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            }
        }
        const cancelarDelete = () => {
            setIsFormModalOpen(false);
            setUserToDelete(null);
    }

    // agregar usuario en la table 
    const handleAddClick = () => {
        setFormData({ name: '', email: '', role: 'guest' });
        setIsFormModalOpen(true);
    }

    const handleEditClick = (user: User) => {
        setFormData(user); //cargar los datos de usuario
        setIsFormModalOpen(true);
    }

        const handleFromChange = (campo: string, valor: string) => {
                setFormData(prev => ({...prev, [campo]: valor}))
        }

        // guardar o crear usuario en la tabla si hay id
        const handleSeveUser = () => {
            if (!formData.name || formData.name.trim() === '') return;

            if(formData.id) {
                setUsers(prevUsers => 
                    prevUsers.map(u => (u.id === formData.id ? { ...u, ...formData } as User : u))
                );
            } else {
                const userToCreate: User = {
                    id: Date.now(),
                    name: formData.name,
                    email: formData.email || '',
                    username: formData.name.toLowerCase().replace(/\s/g, '_'),
                    role: (formData.role as UserRole) || 'guest',
                };
                setUsers(prevUser => [userToCreate, ...prevUser]);
            }
            setIsFormModalOpen(false);
        }

        const handleCancelUser = () => {
            setIsFormModalOpen(false);
        }

        //filter users by order
        const filteredUser = [...filteredUsers].sort((a, b) => {
            if (sortOrder === 'asc') return a.name.localeCompare(b.name);
            return b.name.localeCompare(a.name);
        });

        // estados para numero de paginas 
        const [currentPage, setCurrentPage] = useState(1);

        const usersPage = 5;

        const indexOfLastUser = currentPage * usersPage;
        const indexOfFirstUser = indexOfLastUser - usersPage;

        const currentUser = filteredUser.slice( indexOfFirstUser, indexOfLastUser);
        
        const totalPage = Math.ceil(filteredUser.length / usersPage);


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
        <div className='max-w-5xl mx-auto mb-8'>
            <div className='text-center mt-4'>
                <p>Lista de Usuarios</p>
                <p>{filteredUsers.length} Usuarios registrados</p>
            </div>
            <div className='flex flex-col items-center gap-4 w-full overflow-x-auto border border-gray-200 rounded-lg dark:border-gray-700'>
                <UserTable handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} users={currentUser} sortOrder={sortOrder} onSortToggle={() => setSortOrder(sortOrder === 'asc' ? 'des' : 'asc')} />
            </div>
            {/* user deletion confirmation */}
            <div className='absolute top-1/3 w-full px-6 z-50'>
                <ConfirmationModal isOpen={isDeleteModal} onConfirmar={confirmarDelete} onCancelar={cancelarDelete} />
            </div>
        </div>
            {/* modal to create or edit a user */}
            <div className='absolute top-1/3 z-50 w-full p-4'>
                <UserFormModal isOpen={isFormModalOpen} isEditing={!!formData.id} formData={formData as User} handleChange={handleFromChange} saveUser={handleSeveUser} cancelUser={handleCancelUser} />
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
    )
}