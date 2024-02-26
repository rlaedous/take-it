import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  gifts: null,
  surveyResult: null
};

const surveyResultSlice = createSlice({
  name: 'surveyResult',
  initialState,
  reducers: {
    setGift: (state, action) => {
      return { ...state, gifts: action.payload };
    },
    setSurveyResult: (state, action) => {
      return { ...state, surveyResult: action.payload };
    },
    reset: () => {
      return { gifts: null, surveyResult: null };
    }
  }
});

export const { setGift, setSurveyResult, reset } = surveyResultSlice.actions;
export default surveyResultSlice.reducer;
