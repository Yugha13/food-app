import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  restaurant: string;
  customizations?: string[];
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  promoCode?: string;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  deliveryFee: 2.99,
  serviceFee: 1.99,
  tax: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        JSON.stringify(item.customizations) === JSON.stringify(action.payload.customizations)
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    applyPromoCode: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.promoCode = action.payload.code;
      state.discount = action.payload.discount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    removePromoCode: (state) => {
      state.promoCode = undefined;
      state.discount = 0;
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      state.tax = 0;
      state.discount = 0;
      state.promoCode = undefined;
    },
    calculateTotals: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.tax = subtotal * 0.08; // 8% tax
      state.total = subtotal + state.deliveryFee + state.serviceFee + state.tax - state.discount;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  applyPromoCode, 
  removePromoCode, 
  clearCart 
} = cartSlice.actions;
export default cartSlice.reducer;