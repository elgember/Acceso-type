import { User } from '@/interfaces/user_interface';

interface UserCardProps {
    user?: User | null;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
    <div>
        <img src={user?.avatar_url} alt={`${user?.login} avatar`}/>
        <h4>{user?.login}</h4>
        <span>{user?.type}</span>
    </div>
    )
}