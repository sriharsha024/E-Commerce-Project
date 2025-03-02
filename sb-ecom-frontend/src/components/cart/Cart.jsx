
import { Button } from "@headlessui/react";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const newCart = { ...cart };
    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.productSpecialPrice) * Number(cur?.quantity), 0
    );

    if(!cart || cart.length===0){
        return(<CartEmpty/>);
    }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Cart Header */}
            <div className="flex justify-center items-center gap-2 border-b pb-4 mb-4">
                <MdShoppingCart className="text-2xl text-blue-600" />
                <h1 className="text-xl font-semibold">Your Cart</h1>
            </div>

            {/* Cart Items Header */}
            <div className="grid grid-cols-5 text-gray-600 font-medium py-2 border-b text-center">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
            </div>

            <div>
                {cart && cart.length > 0 &&
                    cart.map((item, i) => <ItemContent key={i} {...item} />)}
            </div>

            {/* Subtotal & Checkout */}
            <div className="mt-6 flex flex-col items-end border-t pt-4">
                <div className="text-lg font-semibold">
                    <span>Subtotal: ₹{newCart.totalPrice}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1 text-right">Taxes and shipping calculated at checkout</p>
                <div className="flex gap-4 mt-4">
                    <Link to="/checkout">
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                            <MdShoppingCart className="text-xl" />
                            Checkout
                        </Button>
                    </Link>
                    <br/>
                    <Link to="/products" className="flex items-center gap-2 text-blue-500 hover:text-blue-800 font-medium">
                        <MdArrowBack className="text-xl" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
