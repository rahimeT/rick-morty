import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from './features/CharactersSlice';

const store = configureStore({
  reducer: {
    character: charactersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
