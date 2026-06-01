import { authContext } from "@/Context/AuthContext";
import { User } from "@/interfaces/user_interface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const {login} = authContext();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const loginAdmin = () => {
        const token = 'ehh17366ebdbh722933g4h4h72h';

        const adminData: User = {
            id: 1,
            username: 'Alice Dev',
            role: 'admin',
            backendAccess: true,
            permissions: ['read', 'write', 'delete'],
            login: 'alice_dev',
            avatar_url: 'https://example.com/avatar.jpg',
            html_url: 'https://example.com/alice_dev',
            type: 'User',
            email: 'alice.dev@example.com'
        } 
        
        login (token, adminData);
    }

    const loginGuest = () => {
        const token = 'ehh17366ebdbh722933g4h4h72h';

        const guestData: User = {
            id: 2,
            username: 'Bob guest',
            role: 'guest',
            trialPeriod: 30,
            login: 'bob_guest',
            avatar_url: 'https://example.com/avatar.jpg',
            html_url: 'https://example.com/bob_guest',
            type: 'User',
            email: 'bob.guest@example.com'
        }

        login(token, guestData);
    }

    const loginEditor = () => {
        const token = 'ehh17366ebdbh722933g4h4h72h';

        const editorData: User = {
            id: 3,
            username: 'Charlie Editor',
            role: 'editor',
            canEdit: true,
            login: 'charlie_editor',
            avatar_url: 'https://example.com/avatar.jpg',
            html_url: 'https://example.com/charlie_editor',
            type: 'User',
            email: 'charlie.editor@example.com'
        }

        login(token, editorData);
    }

    return (
    <div className="mt-4">
        <h3 className="p-2 text-center">Iniciar Sesion</h3>
        <div className="flex justify-center gap-2">
            <div>
                <button className="w-40 bg-red-500 py-1 rounded" onClick={loginAdmin}>Iniciar como Admin</button>
            </div>
            <div>
                <button className="w-40 bg-[#48e] py-1 rounded" onClick={loginGuest}>Iniciar como Guest</button>
            </div>
            <div>
                <button className="w-40 bg-green-500 py-1 rounded" onClick={loginEditor}>Iniciar como Editor</button>
            </div>
        </div>
    </div>
    )
}