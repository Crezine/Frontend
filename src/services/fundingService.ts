import { api } from './api';

export interface Opportunity {
  id: string;
  title: string;
  provider: string;
  category: string;
  amount: string;
  deadline: string;
  imageUrl?: string;
  description?: string;
  link?: string;
}

export const fundingService = {
  getOpportunities: async (category?: string): Promise<Opportunity[]> => {
    const query = category ? `?category=${category}` : '';
    return api.get<Opportunity[]>(`/funding/opportunities${query}`);
  },

  getOpportunity: async (id: string): Promise<Opportunity> => {
    return api.get<Opportunity>(`/funding/opportunities/${id}`);
  },
};
