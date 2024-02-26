import { configureStore } from '@reduxjs/toolkit';
import surveyResult from '../modules/surveyResultSlice';
const store = configureStore({
  reducer: { surveyResult }
});
export default store;
