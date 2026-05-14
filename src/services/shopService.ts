import { api } from './api';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  currency: string;
  imageUrl?: string;
  size?: string;
  inventory: number;
  creatorId: string;
  status: 'draft' | 'published';
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface Order {
  id: string;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export const shopService = {
  getProducts: async (params?: { category?: string; creatorId?: string }): Promise<Product[]> => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<Product[]>(`/shop/products${query ? `?${query}` : ''}`);
  },

  createProduct: async (data: Partial<Product>): Promise<Product> => {
    return api.post<Product>('/shop/products', data);
  },

  getProduct: async (id: string): Promise<Product> => {
    return api.get<Product>(`/shop/products/${id}`);
  },

  updateProduct: async (id: string, data: Partial<Product>): Promise<Product> => {
    return api.put<Product>(`/shop/products/${id}`, data);
  },

  publishProduct: async (id: string): Promise<any> => {
    return api.post(`/shop/products/${id}/publish`);
  },

  getMyProducts: async (): Promise<Product[]> => {
    return api.get<Product[]>('/shop/my-products');
  },

  getCart: async (): Promise<Cart> => {
    return api.get<Cart>('/shop/cart');
  },

  addToCart: async (productId: string, quantity: number): Promise<Cart> => {
    return api.post<Cart>('/shop/cart/add', { productId, quantity });
  },

  removeFromCart: async (productId: string): Promise<Cart> => {
    return api.delete<Cart>(`/shop/cart/${productId}`);
  },

  clearCart: async (): Promise<any> => {
    return api.delete('/shop/cart');
  },

  checkout: async (data: { totalAmount: number; currency: string; transactionReference: string; creatorId: string }, idempotencyKey?: string): Promise<any> => {
    const headers: any = {};
    if (idempotencyKey) {
      headers['x-idempotency-key'] = idempotencyKey;
    }
    return api.post('/shop/checkout', data, { headers });
  },

  getOrders: async (): Promise<Order[]> => {
    return api.get<Order[]>('/shop/orders');
  },

  getSales: async (): Promise<Order[]> => {
    return api.get<Order[]>('/shop/sales');
  },
};
