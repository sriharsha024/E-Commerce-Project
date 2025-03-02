const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART": {
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            if (existingProduct) {
                const updatedCart = state.cart.map((item) =>
                    item.productId === productToAdd.productId ? productToAdd : item
                );
                return { ...state, cart: updatedCart };
            } else {
                return { ...state, cart: [...state.cart, productToAdd] };
            }
        }

        case "REMOVE_CART": {
            const updatedCart = state.cart.filter(
                (item) => item.productId !== action.payload
            );
            return { ...state, cart: updatedCart };
        }

        default:
            return state;
    }
};