import type { User } from "@/interfaces/user_interface";
import * as z  from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";


const userSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor ingrese un correo electrónico válido'),
    role: z.enum(['admin', 'editor', 'guest'], { message: 'Por favor seleccione un rol' }),
})

export type UserFormData = z.infer<typeof userSchema>;

interface modalProps {
    isOpen: boolean;
    cancelUser: () => void;
    userToEdit: User | null;
    saveUser: (data: UserFormData) => void;
}

export const UserFormModal = ({  isOpen, cancelUser, userToEdit, saveUser }: modalProps) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({ resolver: zodResolver(userSchema), defaultValues: {name: '', email: '', role: 'guest'} 
    });

    useEffect(() => {
        if (userToEdit) {
            reset({
                name: userToEdit.name,
                email: userToEdit.email,
                role: userToEdit.role as 'admin' | 'editor' | 'guest'
            });
        } else {
            reset({ name: '', email: '', role: 'guest' });
        }
    }, [userToEdit, isOpen, reset]);

    // si no esta habiero es null 
    if (!isOpen) return null;

    const onSubmit = (data: UserFormData) => {
        saveUser(data);
        reset();
        cancelUser();
    }
    
    return (
    <div className="bg-[#49f] dark:bg-slate-800 max-w-3xl w-full sm:w-full rounded-lg p-3">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col">
            <div className="flex flex-col gap-4 h-full">
                <h2 className="text-center text-white dark:text-slate-400 pt-2">
                    {userToEdit ? 'Editar usuario' : 'Crear usuario'}
                </h2>
                
                    <input className="w-full bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 py-2 pl-2 rounded" type="text" {...register('name')} placeholder="Nombre completo" />
                    <input className="w-full bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 py-2 pl-2 rounded" type="text" {...register('email')} placeholder="Correo electrónico" />
                
                <div>
                    <select className="w-full bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 py-2 pl-2 rounded" id="" {...register('role')}>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="guest">Guest</option>
                    </select>
                </div>
                <div className="flex gap-4 justify-center py-3 w-full px-2">
                    <button className="bg-white dark:bg-slate-500 dark:text-slate-300 w-full py-1 rounded cursor-pointer" type="button" onClick={cancelUser}>Cancelar</button>
                    <button className="bg-white dark:bg-slate-500 dark:text-slate-300 w-full py-1 rounded cursor-pointer" type="submit">{userToEdit ? 'Guardar' : 'Crear usuario'}</button>
                </div>
            </div>
        </form>
    </div>
    )
}