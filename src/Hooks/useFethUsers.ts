import { User } from "@/interfaces/user_interface";
import { fetchUsers } from "@/Services/userServices";
import { useEffect, useState } from "react"

export const useFetchUsers = () => {
    // State to hold the fetched users
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Effect to fetch users on component mount
    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
                setTimeout(() => {
                    setLoading(false);
                }, 2000); // Simulate loading delay
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }
        getUsers();
    }, []);
    // Return the users and loading state
    return { users, setUsers, loading };
}