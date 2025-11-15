// ...existing code will be copied from store.js...import type { TypedUseSelectorHook } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer, { RootState } from './reducer';
import { rtkQueryErrorLogger } from './rtkQueryErrorLogger';
import { baseApi } from '../services/baseApi';

const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware,
            rtkQueryErrorLogger
        ),
});


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

const { dispatch, getState } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, getState, useSelector, useDispatch };
