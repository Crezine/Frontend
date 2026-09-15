import { api } from './api';
import { UserProfile } from './authService';

export const userService = {
  getAllUsers: async (): Promise<UserProfile[]> => {
    return api.get<UserProfile[]>('/users');
  },

  getUserById: async (id: string): Promise<UserProfile> => {
    return api.get<UserProfile>(`/users/${id}`);
  },

  deleteAccount: async (id: string): Promise<void> => {
    return api.delete(`/users/${id}`);
  },
};
