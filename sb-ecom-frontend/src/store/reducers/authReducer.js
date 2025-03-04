const initialState = {
    user: null,
    address: [],
    selectedUserCheckoutAddress:null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload };
        case "USER_ADDRESSES": // Ensure the correct action type
            return { ...state, address: action.payload };
        case "SELECTED_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: action.payload };
        case "REMOVE_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: anull };
            
        case "LOGIN_OUT":
            return { user: null, address: [] }; // Reset to empty array
        default:
            return state;
    }
};
