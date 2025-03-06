import api from "../../api/api";

const initialState = {
    products: [],
    pagination: {
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        lastPage: false,
    },
};

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "FAILED TO FETCH PRODUCTS",
        });
    }
};



export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "CATEGORY_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "FAILED TO FETCH CATEGORIES",
        });
    }
};
// Action to add product to cart
export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
    const { products } = getState().products;
    const productInStore = products.find((item) => item.productId === data.productId);

    if (productInStore && productInStore.quantity >= qty) {
        dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
        toast.success(`${data.productName} added to cart.`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
        toast.error("Out of stock");
    }
};

// Action to increase quantity of item in the cart
export const increaseCartQuantity = (productId) => (dispatch, getState) => {
    const updatedCart = getState().carts.cart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch({ type: "UPDATE_CART", payload: updatedCart });
};

// Action to decrease quantity of item in the cart
export const decreaseCartQuantity = (productId) => (dispatch, getState) => {
    const cartItems = getState().carts.cart;
    const item = cartItems.find((item) => item.productId === productId);

    if (item && item.quantity > 1) {
        const updatedCart = cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
        dispatch({ type: "UPDATE_CART", payload: updatedCart });
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
};

// Action to remove item from the cart
export const removeFromCart = (productId, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: productId });
    toast.success("Item removed from cart.");

    const updatedCart = getState().carts.cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};


export const authenticateSignInUser=(sendData,toast,reset,navigate,setLoader)=>async(dispatch)=>{
    try{
        setLoader(true);
        const {data}=await api.post("/auth/signin",sendData);
        dispatch({type:"LOGIN_USER",payload:data});
        localStorage.setItem("auth",JSON.stringify(data));
        reset();
        toast.success("Login success.");
        navigate("/");
    }
    catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message||"Internal Server Error");   
    }
    finally{
        setLoader(false);
    }
}

export const registerNewUser=(sendData,toast,reset,navigate,setLoader)=>async(dispatch)=>{
    try{
        setLoader(true);
        const {data}=await api.post("/auth/signup",sendData);
        localStorage.setItem("auth",JSON.stringify(data));
        reset();
        toast.success(data?.message || "User registered successfully.");
        navigate("/login");
    }
    catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message||"Internal Server Error");   
    }
    finally{
        setLoader(false);
    }

}

export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");

    setTimeout(() => {
        navigate("/login");
        window.location.reload(); 
    }, 10);
};

export const addUpdateUserAddress = (sendData,toast,addressId,setOpenAddressModal) => async (dispatch,getState) => {

    //const {user}=getState().auth;
    dispatch({ type: "BUTTON_LOADER" });
    try{
        if(!addressId){
            const {data}=await api.post("/addresses",sendData);
        }
        else{
            await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses())
        toast.success("Address saved successfully.");
        dispatch({ type: "IS_SUCCESS"});  
    }
    catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message||"Internal Server Error"); 
        dispatch({ type: "IS_ERROR",payload:null });  
    }
    finally{
        setOpenAddressModal(false);
    }
};

export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/users/addresses`);
        dispatch({ type: "USER_ADDRESSES", payload: data }); 
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
        });
    }
};

export const selectedUserCheckoutAddress = (address) => ({
    type: "SELECTED_CHECKOUT_ADDRESS",
    payload: address,
});

export const deleteUserAddress = ({ toast, addressId, setOpenDeleteModal }) => async (dispatch, getState) => {
    try {
        if (!addressId) {
            toast.error("Invalid address ID.");
            return;
        }

        dispatch({ type: "BTN_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully.");
    } catch (error) {
        console.error("Delete Address Error:", error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "SOME ERROR OCCURED",
        });
        toast.error(error?.response?.data?.message || "Failed to delete address.");
    } finally {
        setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress=()=>{
    return {
        type:"REMOVE_CHECKOUT_ADDRESS",
    }
}

export const addPaymentMethod = (method) => ({
    type: "ADD_PAYMENT_METHOD",
    payload: method,
});


export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('/carts/create', sendCartItems ,{withCredentials: true, });
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
         });
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart', {withCredentials: true, });
        
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
         });
    }
};

export const createStripePaymentSecret 
    = (totalPrice) => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING" });
            const { data } = await api.post("/order/stripe-client-secret", {
                "amount": Number(totalPrice) * 100,
                "currency": "rupee"
              });
            dispatch({ type: "CLIENT_SECRET", payload: data });
              localStorage.setItem("client-secret", JSON.stringify(data));
              dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        }
};


export const stripePaymentConfirmation 
    = (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch, getState) => {
        try {
            const response  = await api.post("/order/users/payments/online", sendData);
            if (response.data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS"});
                dispatch({ type: "CLEAR_CART"});
                toast.success("Order Accepted");
              } else {
                setErrorMesssage("Payment Failed. Please try again.");
              }
        } catch (error) {
            setErrorMesssage("Payment Failed. Please try again.");
        }
};