import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ManageUsers {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'guest';
    status: 'active' | 'inactive';
}

export const AdminPanel = () => {
    const [users] = useState<ManageUsers[]>([
        { id: 1, name: 'alice', email: 'alice@example.com', role: 'admin', status: 'active' },
        { id: 2, name: 'david editor', email: 'david@company.com', role: 'editor', status: 'active' },
        { id: 3, name: 'charlie guest', email: 'charlie@company.com', role: 'guest', status: 'inactive' },
    ]);

    const location = useLocation();
    
    return (
    <div className='h-screen w-screen dark:bg-[#333] dark:text-white'>
        <div className='text-center'>
            <h2>Admin Panel</h2>
            <p>Gestion de usuarios y configuraciones</p>
        </div>
        <div>
            <div className='text-center mt-4'>
                <p>Lista de Usuarios</p>
                <p>{users.length} Usuarios registrados</p>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <h2>Detalles del Usuario</h2>
                <div className='border p-4 rounded'>
                    <table className=''>
                        <thead className=''>
                            <tr className=''>
                                <th className=''>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`/profileAdmin/${user.id}`} state={{ user }} className={user.status === 'active' ? 'bg-success dark:text-white' : 'bg-secondary text-dark'}>
                                            <span>{user.name}</span>
                                        </Link>
                                    </td>
                                    <td className='px-6 text-justify'>
                                        <Link to={`/profileAdmin/${user.id}`} state={{ user }} className={user.status === 'active' ? 'bg-success dark:text-white' : 'bg-secondary text-dark'}>
                                            <span>{user.email}</span>
                                        </Link>
                                    </td>
                                    <td className='px-6'>
                                        <Link to={`/profileAdmin/${user.id}`} state={{ user }} className={user.status === 'active' ? 'bg-success dark:text-white' : 'bg-secondary text-dark'}>
                                            <span className={user.role === 'admin' ? 'bg-primary dark:text-white' : user.role === 'editor' ? 'bg-success dark:text-white' : 'bg-secondary text-dark'}>
                                                {user.role}
                                            </span>
                                        </Link>
                                    </td>
                                    <td className='px-6'>
                                        <Link to={`/profileAdmin/${user.id}`} state={{ user }} className={user.status === 'active' ? 'bg-success dark:text-white' : 'bg-secondary text-dark'}>
                                            <span>
                                                {user.status}
                                            </span>
                                        </Link>
                                    </td>
                                    <td>
                                        <button>Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}