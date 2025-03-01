import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './reducers/ProductReducer';
import { errorReducer } from './reducers/ErrorReducer';
import { cartReducer } from './reducers/cartReducer';

const cartItems=localStorage.getItem("cartItems")
?JSON.parse(localStorage.getItem("cartItems")):[];

const initailState={
    carts:{cart:cartItems}
}
export const store = configureStore({
    reducer: {
        products: productReducer, 
        errors: errorReducer,
        carts:cartReducer,
    },
    preloadedState:initailState,
});

export default store;