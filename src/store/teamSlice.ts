import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'services/api';
import type { TeamMember } from 'types/team';

interface TeamState {
  members: TeamMember[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TeamState = {
  members: [],
  status: 'idle',
  error: null,
};

export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async () => {
  const response = await api.get<TeamMember[]>('/api/homepage/team/');
  return response.data;
});

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && action.payload.length > 0) {
          state.members = action.payload;
        }
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch team members';
      });
  },
});

export default teamSlice.reducer;
