import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'services/api';

interface CompletedCountResponse {
  count: number;
}

interface StatsState {
  projectCount: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StatsState = {
  projectCount: 500,
  status: 'idle',
  error: null,
};

export const fetchCompletedProjectCount = createAsyncThunk('stats/fetchCompletedProjectCount', async () => {
  const response = await api.get<CompletedCountResponse>('/api/projects/completed_count/');
  return response.data;
});

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedProjectCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompletedProjectCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && action.payload.count !== undefined) {
          state.projectCount = action.payload.count > 0 ? action.payload.count : 0;
        }
      })
      .addCase(fetchCompletedProjectCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch project stats';
      });
  },
});

export default statsSlice.reducer;
