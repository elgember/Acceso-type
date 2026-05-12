import { AdminUser, type User } from '../interfaces/user_interface';

const users: User[] = [
    { id: 1, username: 'Alice', role: 'admin', permissions: ['read', 'write'], backendAccess: true },
    { id: 2, username: 'Bob', role: 'admin', permissions: ['read'], backendAccess: false },
    { id: 3, username: 'Charlie', role: 'guest', trialPeriod: 30 },
    { id: 4, username: 'David', role: 'editor', canEdit: true },
];


export function isAdmin(user: User): user is AdminUser {
    // Type guard to check if the user is an AdminUser
    return user.role === 'admin' && 'backendAccess' in user;
}

export const getAuthorizedAdmins = (data: User[]): string[] => {
    return data.filter(isAdmin).filter(admin => admin.backendAccess).map(admin => admin.username);
};