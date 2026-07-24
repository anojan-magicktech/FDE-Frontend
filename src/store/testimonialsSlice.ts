import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'services/api';
import { staticTestimonials } from 'data/testimonials';
import type { Testimonial } from 'types/testimonial';

interface TestimonialsState {
  items: Testimonial[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TestimonialsState = {
  items: staticTestimonials,
  status: 'idle',
  error: null,
};

export const fetchTestimonials = createAsyncThunk('testimonials/fetchTestimonials', async () => {
  const response = await api.get<Testimonial[]>('/api/reviews/');
  return response.data;
});

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload && action.payload.length > 0 ? action.payload : staticTestimonials;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch testimonials';
        state.items = staticTestimonials;
      });
  },
});

export default testimonialsSlice.reducer;
