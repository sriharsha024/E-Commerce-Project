import { configureStore } from '@reduxjs/toolkit';// Import your product slice reducer
import { productReducer } from './actions';

export const store = configureStore({
    reducer: {
        products:productReducer,
    },
    preloadedState:{},
});

export default store;