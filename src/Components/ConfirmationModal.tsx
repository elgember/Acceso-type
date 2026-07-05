
interface confimatioProps {
    isOpen: boolean;
    onConfirmar: () => void;
    onCancelar: () => void;
}

export const ConfirmationModal = ({isOpen, onConfirmar, onCancelar }: confimatioProps) => {

    if (!isOpen) return null;
    
    return (
    <div className="z-20 bg-[#49f] py-10 rounded-lg w-lg md:max-w-3xl">
        <div>
            <p className="text-center text-white">Are you sure you want to delete this user ?</p>
            <div className="flex justify-center gap-4 mt-4">
                <button className="w-30 bg-white text-black py-1 rounded-lg cursor-pointer" onClick={onCancelar}>Cancelar</button>
                <button className="w-30 bg-white text-black py-1 rounded-lg cursor-pointer" onClick={onConfirmar}>Eliminar</button>
            </div>
        </div>
    </div>
    )
}