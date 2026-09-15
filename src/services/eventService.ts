import { api } from './api';

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  location?: string;
  creatorId: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export interface TicketTier {
  id: string;
  eventId: string;
  name: string;
  price: number;
  capacity: number;
  sold: number;
}

export interface TicketOrder {
  id: string;
  eventId: string;
  tierId: string;
  userId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export const eventService = {
  getEvents: async (params?: { limit?: number }): Promise<Event[]> => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<Event[]>(`/events${query ? `?${query}` : ''}`);
  },

  createEvent: async (data: { title: string; description?: string; eventDate: string; location?: string }): Promise<Event> => {
    return api.post<Event>('/events', data);
  },

  getEvent: async (id: string): Promise<Event & { tiers: TicketTier[] }> => {
    return api.get<Event & { tiers: TicketTier[] }>(`/events/${id}`);
  },

  updateEvent: async (id: string, data: Partial<Event>): Promise<Event> => {
    return api.put<Event>(`/events/${id}`, data);
  },

  getMyEvents: async (): Promise<Event[]> => {
    return api.get<Event[]>('/events/my-events');
  },

  publishEvent: async (id: string): Promise<any> => {
    return api.post(`/events/${id}/publish`);
  },

  createTicketTier: async (eventId: string, data: { name: string; price: number; capacity: number }): Promise<TicketTier> => {
    return api.post<TicketTier>(`/events/${eventId}/tiers`, data);
  },

  getAvailableTickets: async (tierId: string): Promise<{ available: number }> => {
    return api.get<{ available: number }>(`/events/tiers/${tierId}/available`);
  },

  buyTickets: async (tierId: string, data: { quantity: number; totalAmount: number }, idempotencyKey?: string): Promise<TicketOrder> => {
    const headers: any = {};
    if (idempotencyKey) {
      headers['x-idempotency-key'] = idempotencyKey;
    }
    return api.post<TicketOrder>(`/events/tiers/${tierId}/buy`, data, { headers });
  },

  getMyTickets: async (): Promise<TicketOrder[]> => {
    return api.get<TicketOrder[]>('/events/my-tickets');
  },

  getEventSales: async (eventId: string): Promise<any> => {
    return api.get(`/events/${eventId}/sales`);
  },
};
