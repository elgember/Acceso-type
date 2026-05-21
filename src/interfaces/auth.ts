import { User } from './user_interface';

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

export interface AuthTypes {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

export interface LoginResponse {
    token: string;
    user: User;
}

