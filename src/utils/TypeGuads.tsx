import { AdminUser, type User } from '../interfaces/user_interface';

export const users: User[] = [
    { id: 1, username: 'Alice', role: 'admin', permissions: ['read', 'write'], backendAccess: true, login: 'alice_dev', avatar_url: 'https://example.com/avatars/alice.jpg', html_url: 'https://example.com/users/alice', type: 'User', email: 'alice@example.com' },
    { id: 2, username: 'Bob', role: 'admin', permissions: ['read'], backendAccess: false, login: 'bob_dev', avatar_url: 'https://example.com/avatars/bob.jpg', html_url: 'https://example.com/users/bob', type: 'User', email: 'bob@example.com' },
    { id: 3, username: 'Charlie', role: 'guest', trialPeriod: 30, login: 'charlie_dev', avatar_url: 'https://example.com/avatars/charlie.jpg', html_url: 'https://example.com/users/charlie', type: 'User', email: 'charlie@example.com' },
    { id: 4, username: 'David', role: 'editor', canEdit: true, login: 'david_dev', avatar_url: 'https://example.com/avatars/david.jpg', html_url: 'https://example.com/users/david', type: 'User', email: 'david@example.com' },
];


export function isAdmin(user: User): user is AdminUser {
    // Type guard to check if the user is an AdminUser
    return user.role === 'admin' && 'backendAccess' in user;
}

export const getAuthorizedAdmins = (data: User[]): string[] => {
    return data.filter(isAdmin).filter(admin => admin.backendAccess).map(admin => admin.username);
};