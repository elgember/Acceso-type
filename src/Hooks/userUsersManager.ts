
import type { User, UserRole } from "@/interfaces/user_interface";
import { useEffect, useState } from "react";
import { supabase } from "@/superbaseCliente";

export const userUsersManager = () => {

    // State to hold the list of users
    const [users, setUsers] = useState<User[]>([]);

    const [loading, setLoading] = useState(true);

    // State to hold the current search term entered by the user
    const [searchTerm, setSearchTerm] = useState('');

    // State to hold the current sort order ('asc' for ascending, 'desc' for descending)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // State to hold the current filter role ('admin', 'guest', 'editor', or 'all')
    const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

    // State to hold the debounced search term, which is updated after a delay to avoid excessive filtering while the user is typing
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const usersPage = 5;

    const fetchUsers = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            console.error('Error al descargar usuarios:', error.message);
        } else if (data) {
            setUsers(data as User[]);
        }
        setLoading(false);
    }

    // sicronisa datos de usuarios
    useEffect(() => {
        fetchUsers();   
    }, []);

    //tiempo de respuesta de busqueda
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => {
            clearTimeout(timerId);
        }
    }, [searchTerm]);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
        user.name.toLocaleLowerCase().includes(debouncedSearch.toLocaleLowerCase()) ||
        user.email.toLocaleLowerCase().includes(debouncedSearch.toLocaleLowerCase());

        const matchesRole = filterRole === 'all' || user.role === filterRole;

        return matchesRole && matchesSearch;
    });

    const filteredUser = [...filteredUsers].sort((a, b) => {
        if (sortOrder === 'asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
    })

    const indexOfLastUser = currentPage * usersPage;
    const indexOfFirsUser = indexOfLastUser - usersPage;
    const currentUser = filteredUser.slice(indexOfFirsUser, indexOfLastUser);
    const totalPage = Math.ceil(filteredUser.length / usersPage);

    return {
        searchTerm,
        setSearchTerm,
        sortOrder,
        setSortOrder,
        filterRole,
        setFilterRole,
        debouncedSearch,
        setDebouncedSearch,
        currentPage,
        setCurrentPage,
        usersPage,
        currentUser,
        totalPage, 
        filteredUsers,
        loading,
        setUsers
    };
}