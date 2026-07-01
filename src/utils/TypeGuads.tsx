import { AdminUser, type User } from '../interfaces/user_interface';

export function isAdmin(user: User): user is AdminUser {
    // Type guard to check if the user is an AdminUser
    return user.role === 'admin' && 'backendAccess' in user;
}

export const getAuthorizedAdmins = (data: User[]): string[] => {
    return data.filter(isAdmin).filter(admin => admin.backendAccess).map(admin => admin.username);
};