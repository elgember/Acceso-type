type UserRole = 'admin' | 'guest' | 'editor';

export interface BaseUser {
    id: number;
    name: string;
    role: UserRole;
}

export interface AdminUser extends BaseUser {
    role: 'admin';
    backendAccess: boolean;
}

export interface GuestUser extends BaseUser {
    role: 'guest';
    trialPeriod: number;
}

export interface EditorUser extends BaseUser {
    role: 'editor';
    canEdit: boolean;
}

export type User = AdminUser | GuestUser | EditorUser;