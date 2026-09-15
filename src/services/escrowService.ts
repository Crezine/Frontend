import { api } from './api';

export interface EscrowContract {
  id: string;
  clientId: string;
  creatorId: string;
  title: string;
  description?: string;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'locked' | 'in_progress' | 'disputed' | 'completed' | 'released';
  createdAt: string;
}

export interface Milestone {
  id: string;
  contractId: string;
  title: string;
  description?: string;
  amountUsd: number;
  status: 'pending' | 'completed' | 'released';
  dueDate?: string;
}

export interface CreateEscrowDto {
  clientId: string;
  title: string;
  description?: string;
  totalAmount: number;
  currency: string;
}

export interface CreateMilestoneDto {
  title: string;
  description?: string;
  amountUsd: number;
  dueDate?: string;
}

export const escrowService = {
  createContract: async (data: CreateEscrowDto): Promise<EscrowContract> => {
    return api.post<EscrowContract>('/escrow', data);
  },

  getContracts: async (): Promise<EscrowContract[]> => {
    return api.get<EscrowContract[]>('/escrow');
  },

  getContract: async (id: string): Promise<EscrowContract> => {
    return api.get<EscrowContract>(`/escrow/${id}`);
  },

  lockContract: async (id: string): Promise<any> => {
    return api.post(`/escrow/${id}/lock`);
  },

  markInProgress: async (id: string): Promise<any> => {
    return api.post(`/escrow/${id}/in-progress`);
  },

  createMilestone: async (id: string, data: CreateMilestoneDto): Promise<any> => {
    return api.post(`/escrow/${id}/milestones`, data);
  },

  getMilestones: async (id: string): Promise<Milestone[]> => {
    return api.get<Milestone[]>(`/escrow/${id}/milestones`);
  },

  completeMilestone: async (id: string, milestoneId: string): Promise<any> => {
    return api.put(`/escrow/${id}/milestones/${milestoneId}/complete`);
  },

  requestRelease: async (id: string, milestoneId: string): Promise<any> => {
    return api.post(`/escrow/${id}/milestones/${milestoneId}/release`);
  },

  releaseFunds: async (id: string): Promise<any> => {
    return api.post(`/escrow/${id}/release`);
  },

  disputeContract: async (id: string): Promise<any> => {
    return api.post(`/escrow/${id}/dispute`);
  },

  completeContract: async (id: string): Promise<any> => {
    return api.post(`/escrow/${id}/complete`);
  },
};
