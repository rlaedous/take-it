import { configureStore } from '@reduxjs/toolkit';
import gift from '../modules/giftSlice';
const store = configureStore({
  reducer: { gift }
});
export default store;
