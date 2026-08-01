import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'services/api';
import type { ThreeDPlan } from 'types/threeDPlan';

interface ThreeDPlansState {
  items: ThreeDPlan[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ThreeDPlansState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchThreeDPlans = createAsyncThunk('threeDPlans/fetchThreeDPlans', async () => {
  const response = await api.get<ThreeDPlan[]>('/api/threed-plans/');
  return response.data;
});

const threeDPlansSlice = createSlice({
  name: 'threeDPlans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreeDPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreeDPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchThreeDPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch 3D plans';
      });
  },
});

export default threeDPlansSlice.reducer;
