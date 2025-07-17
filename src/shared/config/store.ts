import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github-api';

/**
 * Конфигурация Redux store с поддержкой RTK Query
 */
export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

/**
 * Тип корневого состояния приложения
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспетчера store
 */
export type AppDispatch = typeof store.dispatch;
