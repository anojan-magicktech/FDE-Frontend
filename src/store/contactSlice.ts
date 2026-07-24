import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'services/api';
import type { ContactFormData } from 'types/contact';

interface ContactState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactState = {
  status: 'idle',
  error: null,
};

export const submitContactForm = createAsyncThunk('contact/submit', async (formData: ContactFormData) => {
  await api.post('/api/bookings/start-project/', {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    project_type: formData.projectType,
    message: formData.message,
  });
});

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to submit contact request';
      });
  },
});

export const { resetContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
