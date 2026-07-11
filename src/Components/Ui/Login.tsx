import { useAuth } from "@/Hooks/UserAuth";
import { User } from "@/interfaces/user_interface";
import { supabase } from "@/superbaseCliente";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

    //se hace la peticion ala base de datos
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error) {
        setError('Correo o contraseña incorrecta. Intenta de nuevo');
        setLoading(false);
        return;

    }
    if (data.session) {
        const currentToken = data.session.access_token;
        const { data: dbUser, error: dbError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

            if ( dbError || !dbUser ) {
                setError('no se encuentra perfil de usuario');
                setLoading(false);
                return;
            }
            
            if (login) {
                login(currentToken, dbUser as User);
        
        }
        navigate('/', { replace: true});
    } 
        setLoading(false);
    }
    
    return (
    <div className="mt-4 w-full h-full">
        <div>
            <h2 className="font-semibold mb-2">Iniciar Sesion</h2>
            <div>
                { error && (
                   <p className="text-red-500">
                    {error}
                   </p>
                )}
            </div>
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-center w-full">
                    <label className='font-extralight pl-2' htmlFor="email">Ingresa tu correo electronico</label>
                    <input className="bg-[#eee] w-full sm:w-lg py-1 px-2 rounded-lg" type="text" value={email} id="email" placeholder="tuCorreo@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col w-full items-center">
                    <label className="font-extralight pl-2" htmlFor="password">Ingresa tu password</label>
                    <input className="bg-[#eee] w-full sm:w-lg py-1 px-2 rounded-lg" type="text" value={password} id="password" placeholder="Tu contraseña" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="bg-[#49f] w-35 rounded-lg py-1 mt-2 text-white cursor-pointer" disabled={loading} type="submit">{loading ? 'Verificando...' : 'Entrar al panel'}</button>
            </form>
        </div>
    </div>
 )
}