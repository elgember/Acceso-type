type UserRole = 'admin' | 'guest' | 'editor';

export interface BaseUser {
    id: number;
    username: string;
    name: string;
    role: UserRole;
    login?: string;
    avatar_url?: string;
    html_url?: string;
    type?: string;
    email: string;
    permissions?: string[];
    backendAccess?: boolean;
    trialPeriod?: number;
    canEdit?: boolean;
    status?: 'active' | 'inactive';
}

export interface AdminUser extends BaseUser {
    role: 'admin';
    backendAccess?: boolean;
    permissions?: string[];
}

export interface GuestUser extends BaseUser {
    role: 'guest';
    trialPeriod?: number;
}

export interface EditorUser extends BaseUser {
    role: 'editor';
    canEdit?: boolean;
}

export type User = AdminUser | GuestUser | EditorUser;