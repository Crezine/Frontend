import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../../services/api';
import { shopService } from '../../services/shopService';
import { walletService } from '../../services/walletService';
import { escrowService } from '../../services/escrowService';
import { eventService } from '../../services/eventService';
import { fundingService } from '../../services/fundingService';
import { userService } from '../../services/userService';
import { waitlistService } from '../../services/waitlistService';

describe('Domain Services (API Mocking & Logic)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('shopService', () => {
    it('getProducts handles query parameters properly', async () => {
      const apiGetSpy = vi.spyOn(api, 'get').mockResolvedValue([]);
      await shopService.getProducts({ category: 'art', creatorId: 'creator_1' });
      expect(apiGetSpy).toHaveBeenCalledWith('/shop/products?category=art&creatorId=creator_1');

      await shopService.getProducts();
      expect(apiGetSpy).toHaveBeenCalledWith('/shop/products');
    });

    it('creates, retrieves, updates, and publishes products', async () => {
      const mockProduct = { id: 'p1', name: 'Poster', price: 2000, category: 'prints', inventory: 10, creatorId: 'c1', currency: 'USD', status: 'draft' as const };
      const postSpy = vi.spyOn(api, 'post').mockResolvedValue(mockProduct);
      const getSpy = vi.spyOn(api, 'get').mockResolvedValue(mockProduct);
      const putSpy = vi.spyOn(api, 'put').mockResolvedValue({ ...mockProduct, price: 2500 });

      const created = await shopService.createProduct({ name: 'Poster', price: 2000 });
      expect(postSpy).toHaveBeenCalledWith('/shop/products', { name: 'Poster', price: 2000 });
      expect(created).toEqual(mockProduct);

      const fetched = await shopService.getProduct('p1');
      expect(getSpy).toHaveBeenCalledWith('/shop/products/p1');
      expect(fetched).toEqual(mockProduct);

      const updated = await shopService.updateProduct('p1', { price: 2500 });
      expect(putSpy).toHaveBeenCalledWith('/shop/products/p1', { price: 2500 });
      expect(updated.price).toBe(2500);

      await shopService.publishProduct('p1');
      expect(postSpy).toHaveBeenCalledWith('/shop/products/p1/publish');

      await shopService.getMyProducts();
      expect(getSpy).toHaveBeenCalledWith('/shop/my-products');
    });

    it('handles cart operations and checkout with idempotency key', async () => {
      const mockCart = { items: [{ productId: 'p1', name: 'Item', price: 1000, quantity: 2 }], totalAmount: 2000 };
      const getSpy = vi.spyOn(api, 'get').mockResolvedValue(mockCart);
      const postSpy = vi.spyOn(api, 'post').mockResolvedValue(mockCart);
      const deleteSpy = vi.spyOn(api, 'delete').mockResolvedValue(mockCart);

      const cart = await shopService.getCart();
      expect(getSpy).toHaveBeenCalledWith('/shop/cart');
      expect(cart).toEqual(mockCart);

      await shopService.addToCart('p1', 2);
      expect(postSpy).toHaveBeenCalledWith('/shop/cart/add', { productId: 'p1', quantity: 2 });

      await shopService.removeFromCart('p1');
      expect(deleteSpy).toHaveBeenCalledWith('/shop/cart/p1');

      await shopService.clearCart();
      expect(deleteSpy).toHaveBeenCalledWith('/shop/cart');

      const checkoutData = { totalAmount: 2000, currency: 'USD', transactionReference: 'TX_123', creatorId: 'c1' };
      await shopService.checkout(checkoutData, 'idem-key-789');
      expect(postSpy).toHaveBeenCalledWith('/shop/checkout', checkoutData, {
        headers: { 'x-idempotency-key': 'idem-key-789' },
      });

      await shopService.getOrders();
      expect(getSpy).toHaveBeenCalledWith('/shop/orders');

      await shopService.getSales();
      expect(getSpy).toHaveBeenCalledWith('/shop/sales');
    });
  });

  describe('walletService', () => {
    it('fetches balance, filtered transactions, and processes withdrawal', async () => {
      const mockBalance = { balance: 15000, currency: 'USD' };
      const mockTransactions = [
        { id: 't1', amount: 5000, type: 'deposit' as const, status: 'completed' as const, timestamp: '2026-01-01' }
      ];
      const getSpy = vi.spyOn(api, 'get')
        .mockResolvedValueOnce(mockBalance)
        .mockResolvedValueOnce(mockTransactions);
      const postSpy = vi.spyOn(api, 'post').mockResolvedValue({ message: 'Withdrawal initiated' });

      const balance = await walletService.getBalance();
      expect(getSpy).toHaveBeenCalledWith('/wallet/balance');
      expect(balance).toEqual(mockBalance);

      const transactions = await walletService.getTransactions({ type: 'deposit', limit: 10 });
      expect(getSpy).toHaveBeenCalledWith('/wallet/transactions?type=deposit&limit=10');
      expect(transactions).toEqual(mockTransactions);

      const withdrawal = await walletService.withdraw(5000);
      expect(postSpy).toHaveBeenCalledWith('/wallet/withdraw', { amount: 5000 });
      expect(withdrawal).toEqual({ message: 'Withdrawal initiated' });
    });
  });

  describe('escrowService', () => {
    it('manages contracts, milestones, and lifecycle status changes', async () => {
      const mockContract = {
        id: 'esc_1',
        clientId: 'cli_1',
        creatorId: 'cre_1',
        title: 'Logo Design',
        totalAmount: 500,
        currency: 'USD',
        status: 'pending' as const,
        createdAt: '2026-01-01',
      };
      const postSpy = vi.spyOn(api, 'post').mockResolvedValue(mockContract);
      const getSpy = vi.spyOn(api, 'get').mockResolvedValue([mockContract]);
      const putSpy = vi.spyOn(api, 'put').mockResolvedValue({ success: true });

      const created = await escrowService.createContract({
        clientId: 'cli_1',
        title: 'Logo Design',
        totalAmount: 500,
        currency: 'USD',
      });
      expect(postSpy).toHaveBeenCalledWith('/escrow', {
        clientId: 'cli_1',
        title: 'Logo Design',
        totalAmount: 500,
        currency: 'USD',
      });
      expect(created).toEqual(mockContract);

      await escrowService.getContracts();
      expect(getSpy).toHaveBeenCalledWith('/escrow');

      await escrowService.lockContract('esc_1');
      expect(postSpy).toHaveBeenCalledWith('/escrow/esc_1/lock');

      await escrowService.markInProgress('esc_1');
      expect(postSpy).toHaveBeenCalledWith('/escrow/esc_1/in-progress');

      await escrowService.createMilestone('esc_1', { title: 'Drafts', amountUsd: 250 });
      expect(postSpy).toHaveBeenCalledWith('/escrow/esc_1/milestones', { title: 'Drafts', amountUsd: 250 });

      await escrowService.getMilestones('esc_1');
      expect(getSpy).toHaveBeenCalledWith('/escrow/esc_1/milestones');

      await escrowService.completeMilestone('esc_1', 'm_1');
      expect(putSpy).toHaveBeenCalledWith('/escrow/esc_1/milestones/m_1/complete');

      await escrowService.requestRelease('esc_1', 'm_1');
      expect(postSpy).toHaveBeenCalledWith('/escrow/esc_1/milestones/m_1/release');

      await escrowService.releaseFunds('esc_1');
      expect(postSpy).toHaveBeenCalledWith('/escrow/esc_1/release');

      await escrowService.disputeContract('esc_1');
      expect(postSpy).toHaveBeenCalledWith('/escrow/esc_1/dispute');

      await escrowService.completeContract('esc_1');
      expect(postSpy).toHaveBeenCalledWith('/escrow/esc_1/complete');
    });
  });

  describe('eventService', () => {
    it('handles event queries, ticket tier creation, and purchasing tickets with idempotency', async () => {
      const mockEvent = {
        id: 'ev_1',
        title: 'Music Gala',
        eventDate: '2026-10-10',
        creatorId: 'cre_1',
        status: 'published' as const,
        createdAt: '2026-01-01',
      };
      const getSpy = vi.spyOn(api, 'get').mockResolvedValue([mockEvent]);
      const postSpy = vi.spyOn(api, 'post').mockResolvedValue(mockEvent);

      await eventService.getEvents({ limit: 5 });
      expect(getSpy).toHaveBeenCalledWith('/events?limit=5');

      await eventService.createEvent({ title: 'Music Gala', eventDate: '2026-10-10' });
      expect(postSpy).toHaveBeenCalledWith('/events', { title: 'Music Gala', eventDate: '2026-10-10' });

      await eventService.createTicketTier('ev_1', { name: 'VIP', price: 5000, capacity: 100 });
      expect(postSpy).toHaveBeenCalledWith('/events/ev_1/tiers', { name: 'VIP', price: 5000, capacity: 100 });

      await eventService.getAvailableTickets('tier_1');
      expect(getSpy).toHaveBeenCalledWith('/events/tiers/tier_1/available');

      await eventService.buyTickets('tier_1', { quantity: 2, totalAmount: 10000 }, 'ticket-idem-123');
      expect(postSpy).toHaveBeenCalledWith('/events/tiers/tier_1/buy', { quantity: 2, totalAmount: 10000 }, {
        headers: { 'x-idempotency-key': 'ticket-idem-123' },
      });

      await eventService.getMyTickets();
      expect(getSpy).toHaveBeenCalledWith('/events/my-tickets');
    });
  });

  describe('fundingService', () => {
    it('retrieves opportunities with and without category filter', async () => {
      const mockOpportunities = [
        { id: 'opp_1', title: 'Arts Grant', provider: 'Gov Fund', category: 'grants', amount: '$5,000', deadline: '2026-12-31' },
      ];
      const getSpy = vi.spyOn(api, 'get').mockResolvedValue(mockOpportunities);

      const all = await fundingService.getOpportunities();
      expect(getSpy).toHaveBeenCalledWith('/funding/opportunities');
      expect(all).toEqual(mockOpportunities);

      await fundingService.getOpportunities('grants');
      expect(getSpy).toHaveBeenCalledWith('/funding/opportunities?category=grants');

      await fundingService.getOpportunity('opp_1');
      expect(getSpy).toHaveBeenCalledWith('/funding/opportunities/opp_1');
    });
  });

  describe('userService', () => {
    it('calls getAllUsers, getUserById, and deleteAccount', async () => {
      const getSpy = vi.spyOn(api, 'get').mockResolvedValue([]);
      const deleteSpy = vi.spyOn(api, 'delete').mockResolvedValue(undefined);

      await userService.getAllUsers();
      expect(getSpy).toHaveBeenCalledWith('/users');

      await userService.getUserById('u_123');
      expect(getSpy).toHaveBeenCalledWith('/users/u_123');

      await userService.deleteAccount('u_123');
      expect(deleteSpy).toHaveBeenCalledWith('/users/u_123');
    });
  });

  describe('waitlistService', () => {
    it('joins waitlist, calls backend API, and caches locally', async () => {
      const postSpy = vi.spyOn(api, 'post').mockResolvedValue({ status: 'ok' });

      const entry = await waitlistService.joinWaitlist({
        name: 'Jane Doe',
        email: 'jane@example.com',
        craft: 'Designer',
      });

      expect(postSpy).toHaveBeenCalledWith('/waitlist', expect.objectContaining({
        name: 'Jane Doe',
        email: 'jane@example.com',
        craft: 'Designer',
        referralCode: expect.stringMatching(/^CRZ-/),
      }));

      expect(entry.name).toBe('Jane Doe');
      expect(entry.email).toBe('jane@example.com');
      expect(entry.position).toBeGreaterThan(0);
      expect(waitlistService.hasJoinedWaitlist()).toBe(true);
      expect(waitlistService.getSavedEntry()).toEqual(entry);
      expect(waitlistService.getLocalSubscribers()).toHaveLength(1);
    });

    it('gracefully handles backend failure when joining waitlist and still persists locally', async () => {
      vi.spyOn(api, 'post').mockRejectedValue(new Error('Network error'));

      const entry = await waitlistService.joinWaitlist({
        name: 'Fallback User',
        email: 'fallback@example.com',
      });

      expect(entry.email).toBe('fallback@example.com');
      expect(waitlistService.hasJoinedWaitlist()).toBe(true);
      expect(waitlistService.getSavedEntry()).toEqual(entry);
    });

    it('handles modal and banner dismissals and resetting', () => {
      expect(waitlistService.isModalDismissed()).toBe(false);
      waitlistService.dismissModal();
      expect(waitlistService.isModalDismissed()).toBe(true);

      waitlistService.resetDismissals();
      expect(waitlistService.isModalDismissed()).toBe(false);
    });
  });
});
