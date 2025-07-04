import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: string[];
}

export interface Order {
  id: string;
  items: OrderItem[];
  restaurant: {
    id: string;
    name: string;
    image: string;
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked-up' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  deliveryAddress: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  orderTime: string;
  paymentMethod: string;
  specialInstructions?: string;
  rating?: number;
  review?: string;
  trackingUpdates: {
    status: string;
    message: string;
    timestamp: string;
  }[];
}

interface OrdersState {
  orders: Order[];
  currentOrder?: Order;
  loading: boolean;
}

const mockOrders: Order[] = [
  {
    id: '1',
    items: [
      {
        id: '1',
        name: 'Margherita Pizza',
        price: 18.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
        customizations: ['Medium Size', 'Thin Crust'],
      },
      {
        id: '4',
        name: 'Truffle Pasta',
        price: 28.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      },
    ],
    restaurant: {
      id: '1',
      name: 'Bella Italia',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    },
    status: 'delivered',
    total: 54.95,
    subtotal: 47.98,
    deliveryFee: 2.99,
    tax: 3.84,
    discount: 0,
    deliveryAddress: 'Andimadam, Ariyalur',
    estimatedDeliveryTime: '2024-01-20T19:30:00Z',
    actualDeliveryTime: '2024-01-20T19:25:00Z',
    orderTime: '2024-01-20T18:45:00Z',
    paymentMethod: 'Visa ****4242',
    rating: 5,
    review: 'Amazing food and fast delivery!',
    trackingUpdates: [
      {
        status: 'confirmed',
        message: 'Order confirmed by restaurant',
        timestamp: '2024-01-20T18:47:00Z',
      },
      {
        status: 'preparing',
        message: 'Kitchen started preparing your order',
        timestamp: '2024-01-20T18:52:00Z',
      },
      {
        status: 'ready',
        message: 'Order ready for pickup',
        timestamp: '2024-01-20T19:15:00Z',
      },
      {
        status: 'picked-up',
        message: 'Driver picked up your order',
        timestamp: '2024-01-20T19:18:00Z',
      },
      {
        status: 'delivered',
        message: 'Order delivered successfully',
        timestamp: '2024-01-20T19:25:00Z',
      },
    ],
  },
  {
    id: '2',
    items: [
      {
        id: '3',
        name: 'Salmon Sashimi',
        price: 24.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
      },
      {
        id: '5',
        name: 'Dragon Roll',
        price: 19.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
      },
    ],
    restaurant: {
      id: '3',
      name: 'Tokyo Sushi',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    },
    status: 'preparing',
    total: 72.95,
    subtotal: 64.97,
    deliveryFee: 3.99,
    tax: 5.20,
    discount: 1.21,
    deliveryAddress: 'Andimadam, Ariyalur',
    estimatedDeliveryTime: '2024-01-21T20:15:00Z',
    orderTime: '2024-01x-21T19:30:00Z',
    paymentMethod: 'PayPal',
    specialInstructions: 'Extra wasabi please',
    trackingUpdates: [
      {
        status: 'confirmed',
        message: 'Order confirmed by restaurant',
        timestamp: '2024-01-21T19:32:00Z',
      },
      {
        status: 'preparing',
        message: 'Kitchen started preparing your order',
        timestamp: '2024-01-21T19:38:00Z',
      },
    ],
  },
];

const initialState: OrdersState = {
  orders: mockOrders,
  loading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status']; message?: string }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        order.trackingUpdates.push({
          status: action.payload.status,
          message: action.payload.message || `Order ${action.payload.status}`,
          timestamp: new Date().toISOString(),
        });
        
        if (action.payload.status === 'delivered') {
          order.actualDeliveryTime = new Date().toISOString();
        }
      }
      
      if (state.currentOrder?.id === action.payload.id) {
        state.currentOrder = order;
      }
    },
    rateOrder: (state, action: PayloadAction<{ id: string; rating: number; review?: string }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.rating = action.payload.rating;
        order.review = action.payload.review;
      }
    },
    setCurrentOrder: (state, action: PayloadAction<Order | undefined>) => {
      state.currentOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setOrders, 
  addOrder, 
  updateOrderStatus, 
  rateOrder, 
  setCurrentOrder, 
  setLoading 
} = ordersSlice.actions;
export default ordersSlice.reducer;