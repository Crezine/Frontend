import { api } from './api';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  craft?: string;
  role: 'user' | 'creator';
}

export interface SignUpData {
  id: string; // Firebase UID
  email: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface SignInData {
  id: string; // Firebase UID
}

export const authService = {
  signUp: async (data: SignUpData): Promise<UserProfile> => {
    return api.post<UserProfile>('/users/signup', data);
  },

  signIn: async (data: SignInData): Promise<UserProfile> => {
    return api.post<UserProfile>('/users/signin', data);
  },

  getMe: async (): Promise<UserProfile> => {
    return api.get<UserProfile>('/auth/me');
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    return api.put<UserProfile>('/auth/me', data);
  },
};
