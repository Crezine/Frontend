import { api } from './api';

export interface WalletBalance {
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'escrow_hold' | 'escrow_release';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  description?: string;
}

export interface TransactionFilters {
  limit?: number;
  type?: 'deposit' | 'withdrawal' | 'escrow_hold' | 'escrow_release';
  status?: 'pending' | 'completed' | 'failed';
}

export const walletService = {
  getBalance: async (): Promise<WalletBalance> => {
    return api.get<WalletBalance>('/wallet/balance');
  },

  getTransactions: async (filters: TransactionFilters = {}): Promise<Transaction[]> => {
    const query = new URLSearchParams(filters as any).toString();
    const endpoint = `/wallet/transactions${query ? `?${query}` : ''}`;
    return api.get<Transaction[]>(endpoint);
  },

  withdraw: async (amount: number, idempotencyKey?: string): Promise<{ message: string }> => {
    return idempotencyKey
      ? api.post<{ message: string }>('/wallet/withdraw', { amount }, { headers: { 'x-idempotency-key': idempotencyKey } })
      : api.post<{ message: string }>('/wallet/withdraw', { amount });
  },
};
