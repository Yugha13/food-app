import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: string;
  type: 'product' | 'restaurant';
  addedAt: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [
    { id: '1', type: 'product', addedAt: '2024-01-15T10:30:00Z' },
    { id: '2', type: 'product', addedAt: '2024-01-20T14:15:00Z' },
    { id: '1', type: 'restaurant', addedAt: '2024-01-25T09:45:00Z' },
  ],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<{ id: string; type: 'product' | 'restaurant' }>) => {
      const exists = state.items.find(
        item => item.id === action.payload.id && item.type === action.payload.type
      );
      
      if (!exists) {
        state.items.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromFavorites: (state, action: PayloadAction<{ id: string; type: 'product' | 'restaurant' }>) => {
      state.items = state.items.filter(
        item => !(item.id === action.payload.id && item.type === action.payload.type)
      );
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;