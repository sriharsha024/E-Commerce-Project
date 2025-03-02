import { Link } from "react-router-dom";
import {  HiOutlineShoppingCart } from "react-icons/hi";
import { MdArrowBack } from "react-icons/md";

const CartEmpty = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-6">
            <HiOutlineShoppingCart className="text-gray-400 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">
                Looks like you haven’t added anything to your cart yet.
            </p>
            <Link to="/">
                <button className="mt-6 px-6 py-2 flex items-center gap-2 text-blue-600 bg-white-600 rounded-lg hover:bg-gray-100 transition-all">
                    <MdArrowBack className="text-lg" /> Start Shopping
                </button>
            </Link>
        </div>
    );
};

export default CartEmpty;
