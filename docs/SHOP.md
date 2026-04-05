# Crezine Shop - Backend Integration Documentation

This document outlines the architecture and integration strategy for connecting the Crezine Shop frontend to a backend service.

## 1. Core Endpoints

### Products & Inventory
- `GET /api/v1/products`: Fetch all products with filtering options (category, type).
- `GET /api/v1/products/:id`: Fetch single product details.
- `GET /api/v1/categories`: List all available shop categories.

### Cart & User Session
- `POST /api/v1/cart/sync`: Synchronize local storage cart with user account (if logged in).
- `GET /api/v1/cart/validate`: Verify pricing and availability of items in cart before checkout.

### Order Processing
- `POST /api/v1/orders`: Create a new order (pending status).
- `GET /api/v1/orders/:id`: Check order status and payment confirmation.

## 2. Payment Integration

### M-PESA (STK Push / Daraja API)
1. **Flow**: Frontend sends phone number to backend -> Backend triggers STK Push -> User enters PIN -> Safaricom sends callback to backend -> Backend updates order status.
2. **Endpoint**: `POST /api/v1/payments/mpesa/stk-push`
3. **Payload**:
   ```json
   {
     "orderId": "ORD-123",
     "phoneNumber": "2547XXXXXXXX",
     "amount": 25000
   }
   ```

### Card & Bank (Stripe / Flutterwave / Paystack)
1. **Flow**: Use hosted checkout or elements/inline frames -> Payment provider handles sensitive data -> Provider sends webhook notification to backend.
2. **Endpoint**: `POST /api/v1/payments/card/initiate`
3. **Security**: Ensure PCI DSS compliance by never processing card numbers directly on our servers.

## 3. Data Models

### Product Schema
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image_url: string;
  size: string;
  category: "all-products" | "collections" | "pencil-portrait" | "paintings";
  stock_status: "in-stock" | "out-of-stock";
}
```

### Order Schema
```typescript
interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  shipping_fee: number;
  total: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  payment_method: "mpesa" | "card" | "bank";
  created_at: string;
}
```

## 4. Frontend Best Practices
- **Security**: Always validate prices on the backend. Never trust the `price` field sent from the frontend cart state.
- **State Management**: Use React context or a robust store for large cart states.
- **Optimistic UI**: Update cart UI immediately while syncing with backend in the background.
- **Loading States**: Implement skeleton loaders for product grids to improve perceived performance.
