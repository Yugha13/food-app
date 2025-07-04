import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  favoriteRestaurant: string;
  averageRating: number;
  loyaltyPoints: number;
  currentStreak: number;
  longestStreak: number;
}

interface UserPreferences {
  dietaryRestrictions: string[];
  spicePreference: 'mild' | 'medium' | 'hot' | 'extra-hot';
  allergies: string[];
  favoriteCategories: string[];
  notificationsEnabled: boolean;
  darkMode: boolean;
  language: string;
}

interface UserState {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isAuthenticated: boolean;
  addresses: {
    id: string;
    label: string;
    address: string;
    coordinates: { lat: number; lng: number };
    isDefault: boolean;
  }[];
  paymentMethods: {
    id: string;
    type: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
    last4?: string;
    brand?: string;
    isDefault: boolean;
  }[];
  stats: UserStats;
  achievements: Achievement[];
  preferences: UserPreferences;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Order',
    description: 'Complete your first order',
    icon: '🎉',
    unlockedAt: '2024-01-15',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: '2',
    title: 'Pizza Lover',
    description: 'Order 10 pizzas',
    icon: '🍕',
    unlockedAt: '2024-02-20',
    progress: 10,
    maxProgress: 10,
  },
  {
    id: '3',
    title: 'Streak Master',
    description: 'Order for 7 consecutive days',
    icon: '🔥',
    progress: 5,
    maxProgress: 7,
  },
  {
    id: '4',
    title: 'Big Spender',
    description: 'Spend $500 total',
    icon: '💰',
    progress: 347,
    maxProgress: 500,
  },
];

const initialState: UserState = {
  id: '1',
  name: 'Yugha',
  email: 'yugha@gmail.com',
  phone: '+91 88888-00000',
  avatar: 'https://atlas-content-cdn.pixelsquid.com/stock-images/gold-icon-man-avatar-male-symbol-ze8mxZC-600.jpg',
  isAuthenticated: true,
  addresses: [
    {
      id: '1',
      label: 'Home',
      address: 'Andimadam, Ariyalur',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      isDefault: true,
    },
    {
      id: '2',
      label: 'Work',
      address: 'Punjab',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true,
    },
    {
      id: '2',
      type: 'paypal',
      isDefault: false,
    },
  ],
  stats: {
    totalOrders: 48,
    totalSpent: 1247.83,
    favoriteRestaurant: 'Star Bucks',
    averageRating: 4.6,
    loyaltyPoints: 2840,
    currentStreak: 5,
    longestStreak: 12,
  },
  achievements: mockAchievements,
  preferences: {
    dietaryRestrictions: ['vegetarian'],
    spicePreference: 'medium',
    allergies: ['nuts'],
    favoriteCategories: ['Pizza', 'Italian', 'Sushi'],
    notificationsEnabled: true,
    darkMode: false,
    language: 'en',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    updateProfile: (state, action: PayloadAction<Partial<Pick<UserState, 'name' | 'email' | 'phone' | 'avatar'>>>) => {
      Object.assign(state, action.payload);
    },
    addAddress: (state, action: PayloadAction<Omit<UserState['addresses'][0], 'id'>>) => {
      const newAddress = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.addresses.push(newAddress);
    },
    updateAddress: (state, action: PayloadAction<UserState['addresses'][0]>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses.forEach(addr => {
        addr.isDefault = addr.id === action.payload;
      });
    },
    addPaymentMethod: (state, action: PayloadAction<Omit<UserState['paymentMethods'][0], 'id'>>) => {
      const newPaymentMethod = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.paymentMethods.push(newPaymentMethod);
    },
    removePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethods = state.paymentMethods.filter(pm => pm.id !== action.payload);
    },
    setDefaultPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethods.forEach(pm => {
        pm.isDefault = pm.id === action.payload;
      });
    },
    updateStats: (state, action: PayloadAction<Partial<UserStats>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    unlockAchievement: (state, action: PayloadAction<string>) => {
      const achievement = state.achievements.find(a => a.id === action.payload);
      if (achievement && !achievement.unlockedAt) {
        achievement.unlockedAt = new Date().toISOString();
        achievement.progress = achievement.maxProgress;
      }
    },
    updateAchievementProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const achievement = state.achievements.find(a => a.id === action.payload.id);
      if (achievement) {
        achievement.progress = Math.min(action.payload.progress, achievement.maxProgress);
        if (achievement.progress >= achievement.maxProgress && !achievement.unlockedAt) {
          achievement.unlockedAt = new Date().toISOString();
        }
      }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { 
  setUser, 
  updateProfile, 
  addAddress, 
  updateAddress, 
  removeAddress, 
  setDefaultAddress,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
  updateStats,
  unlockAchievement,
  updateAchievementProgress,
  updatePreferences,
  logout 
} = userSlice.actions;
export default userSlice.reducer;