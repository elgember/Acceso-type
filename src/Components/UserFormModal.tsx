import { User } from "@/interfaces/user_interface";

interface modalProps {
    handleChange: (campo: string, valor: string) => void;
    isOpen: boolean;
    formData: User;
    cancelUser: () => void;
    isEditing: boolean;
    saveUser: () => void;
}

export const UserFormModal = ({ handleChange, isOpen, formData, cancelUser, isEditing, saveUser }: modalProps) => {

    // si no esta habiero es null 
    if (!isOpen) return null;
    
    return (
    <div className="bg-[#49f] dark:bg-slate-800 w-full rounded-lg p-3">
        <div>
            <div className="flex flex-col gap-2 p-2">
                <h2 className="text-center text-white dark:text-slate-400">
                    {isEditing ? 'Editar usuario' : 'Crear usuario'}
                </h2>
                <input className="bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 py-1 pl-2 rounded" type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                <input className="bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 py-1 pl-2 rounded" type="text" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div className="flex gap-4 justify-center py-3">
                <button className="bg-white dark:bg-slate-500 dark:text-slate-300 w-25 py-1 rounded cursor-pointer" onClick={cancelUser}>Cancelar</button>
                <button className="bg-white dark:bg-slate-500 dark:text-slate-300 w-25 py-1 rounded cursor-pointer" onClick={saveUser}>{isEditing ? 'Actualizar' : 'Crear'}</button>
            </div>
        </div>
    </div>
    )
}

/*
{isEditModalOpen && isUserToEdit && (
        // modal para editar usuario del la table 
            <div className='absolute top-1/2 z-50 w-full flex justify-center'>
                <div className='bg-[#49e] dark:bg-slate-800 text-white dark:text-slate-500 w-md md:w-lg flex flex-col gap-2 py-4 px-6 text-center rounded-lg'>
                    <label>Editar Nombre de Usuario</label>
                    <input className='bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 rounded' type="text" value={isUserToEdit.name} onChange={(e) => editChangeUser('name', e.target.value)}/>
                    <input className='bg-[#eee] dark:bg-slate-500 text-black dark:text-slate-300 rounded' type="text" value={isUserToEdit.email} onChange={(e) => editChangeEmail('email', e.target.value)} />
                    <div className='flex justify-center gap-6 pt-1'>
                        <button onClick={cancelUser} className='bg-white dark:bg-slate-500 text-black dark:text-slate-300 py-1 px-3 rounded-md cursor-pointer'>Cancelar</button>
                        <button onClick={seveUser} className='bg-white dark:bg-slate-500 text-black dark:text-slate-300 py-1 px-3 rounded-md cursor-pointer'>Aceptar</button>
                    </div>
                </div>
                
            </div>
        )}
*/