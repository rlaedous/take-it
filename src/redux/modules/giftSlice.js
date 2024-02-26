import { createSlice } from '@reduxjs/toolkit';
const initialState = null;

const giftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {
    setGift: (state, action) => {
      return action.payload;
    }
  }
});

export const { setGift } = giftSlice.actions;
export default giftSlice.reducer;
