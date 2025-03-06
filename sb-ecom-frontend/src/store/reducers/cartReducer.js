const initialState = {
    cart: JSON.parse(localStorage.getItem("cartItems")) || [], 
    totalPrice: 0,
    cartId: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART": {
            const productToAdd = action.payload;
            const existingProduct = state.cart.find((item) => item.productId === productToAdd.productId);
            const updatedCart = existingProduct
                ? state.cart.map((item) =>
                      item.productId === productToAdd.productId
                          ? { ...item, quantity: item.quantity + productToAdd.quantity }
                          : item
                  )
                : [...state.cart, { ...productToAdd, quantity: productToAdd.quantity }];
            localStorage.setItem("cartItems", JSON.stringify(updatedCart)); 
            return { ...state, cart: updatedCart };
        }
        
        case "UPDATE_CART":
            localStorage.setItem("cartItems", JSON.stringify(action.payload));
            return { ...state, cart: action.payload };

        case "REMOVE_CART":
            const updatedCartAfterRemoval = state.cart.filter((item) => item.productId !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartAfterRemoval)); 
            return {
                ...state,
                cart: updatedCartAfterRemoval,
            };

        case "GET_USER_CART_PRODUCTS":
            return {
                ...state,
                cart: action.payload,
                totalPrice: action.totalPrice,
                cartId: action.cartId,
            };
        // case "CLEAR_CART":
        //     return { cart:[], totalPrice: 0, cartId: null};

        default:
            return state;
    }
};
