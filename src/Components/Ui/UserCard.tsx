import { User } from '@/interfaces/user_interface';

interface UserCardProps {
    users: User;
}

export const UserCard = ({ users }: UserCardProps) => {
    return (
    <div>
        <img src={users.avatar_url} alt={`${users.login} avatar`}/>
        <h4>{users.login}</h4>
        <span>{users.type}</span>
        
    </div>
    )
}