import { isAdmin } from '@/utils/TypeGuads';
import { User } from '@/interfaces/user_interface';

interface CardPros {
    user: User;
}

export const Card = ({ user }: CardPros) => {
    return (
    <div className='dark:text-white'>
        <p>Usuario: {user.username}</p>
        {isAdmin(user) ? (
            <div>
                <span>Nivel de acceso: {user.permissions.join(', ')}</span>
            </div>
        ) : (
            <div>
                <span>Este es un usuario regular</span>
            </div>
        )}
    </div>
    )
}