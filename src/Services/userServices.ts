import { User } from "@/interfaces/user_interface";

interface ApiUser {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10');
    if (!response.ok) throw new Error('Error al obtener Usuarios');
    const dataUsers: ApiUser[] = await response.json();
    return dataUsers.map((item) => {
        const baseUser: User = {
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            role: item.id === 1 ? 'admin' : item.id === 2 ? 'guest': 'editor',
        }
        return baseUser;
    });
};