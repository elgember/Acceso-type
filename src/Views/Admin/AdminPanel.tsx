import { useState } from 'react';

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

    return (
    <div>
        <div>
            <h2>Admin Panel</h2>
            <p>Gestion de usuarios y configuraciones</p>
        </div>
        <div>
            <div>
                <p>Lista de Usuarios</p>
                <p>{users.length} Usuarios registrados</p>
            </div>
            <div>
                <h2>Detalles del Usuario</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={user.role === 'admin' ? 'bg-primary text-white' : user.role === 'editor' ? 'bg-success text-white' : 'bg-secondary text-dark'}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={user.status === 'active' ? 'bg-success text-white' : 'bg-danger text-white'}>
                                            {user.status}
                                        </span>
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