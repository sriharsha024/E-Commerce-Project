import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { removeFromCart, decreaseCartQuantity, increaseCartQuantity } from "../../store/actions";
import toast from "react-hot-toast";
import truncateText from "../../utils/truncateText";

const ItemContent = ({
    productId,
    productName,
    productDescription,
    productImage,
    quantity,
    price,
    specialProductPrice,
    cartId,
}) => {
    const dispatch = useDispatch();
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    // Load stored quantity from localStorage
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const item = cartItems.find((item) => item.productId === productId);
        if (item) {
            setCurrentQuantity(item.quantity); // Set saved quantity
        }
    }, [productId]);

    const updateLocalStorage = (updatedQuantity) => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCart = cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity: updatedQuantity } : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const handleQtyIncrease = (cartItems) => {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);
        updateLocalStorage(newQuantity);
        dispatch(increaseCartQuantity(cartItems, newQuantity));
    };

    const handleQtyDecrease = (cartItems) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            updateLocalStorage(newQuantity);
            dispatch(decreaseCartQuantity(cartItems, newQuantity));
        }
    };

    const handleRemoveItem = () => {
        dispatch(removeFromCart(productId, toast));
    };

    return (
        <div className="grid grid-cols-5 items-center text-gray-600 border-b py-4 gap-4 text-center">
            <div className="flex flex-col items-center">
                <img src={productImage} className="w-20 h-20 object-cover rounded-md" alt={truncateText(productName,20)} />
                <button 
                    onClick={handleRemoveItem} 
                    className="mt-2 flex items-center gap-2 text-red-500 hover:text-red-700 font-medium">
                    <HiOutlineTrash className="text-lg" /> Remove
                </button>
            </div>
            <div className="text-gray-800 font-medium">{productName}</div>
            <div className="text-gray-900 font-semibold">₹{Number(specialProductPrice)}</div>
            <div className="text-gray-900 font-semibold">
                <SetQuantity 
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={() => handleQtyIncrease({
                        productImage,
                        productName,
                        productDescription,
                        specialProductPrice,
                        price,
                        productId,
                    })}
                    handleQtyDecrease={() => handleQtyDecrease({
                        productImage,
                        productName,
                        productDescription,
                        specialProductPrice,
                        price,
                        productId,
                    })} 
                />
            </div>
            <div className="text-gray-900 font-semibold">
                ₹{Number(currentQuantity) * Number(specialProductPrice)}
            </div>
        </div>
    );
};

export default ItemContent;