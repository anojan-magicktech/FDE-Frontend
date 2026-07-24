import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'services/api';
import type { Service } from 'types/service';

interface ServicesState {
  items: Service[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ServicesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await api.get<Service[]>('/api/services/');
  return response.data;
});

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch services';
      });
  },
});

export default servicesSlice.reducer;
