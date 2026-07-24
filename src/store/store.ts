import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import projectsReducer from './projectsSlice';
import teamReducer from './teamSlice';
import testimonialsReducer from './testimonialsSlice';
import statsReducer from './statsSlice';
import contactReducer from './contactSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    projects: projectsReducer,
    team: teamReducer,
    testimonials: testimonialsReducer,
    stats: statsReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
