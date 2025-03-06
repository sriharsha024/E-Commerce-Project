import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, decreaseCartQuantity, increaseCartQuantity } from "../../store/actions";
import toast from "react-hot-toast";
import truncateText from "../../utils/truncateText";

const ItemContent = ({
    productId,
    productName,
    productImage,
    specialProductPrice,
}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.carts.cart);

    const currentItem = cartItems.find((item) => item.productId === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 1;

    const handleQtyIncrease = () => dispatch(increaseCartQuantity(productId));
    const handleQtyDecrease = () => {
        if (currentQuantity > 1) {
            dispatch(decreaseCartQuantity(productId));
        }
    };
    const handleRemoveItem = () => dispatch(removeFromCart(productId, toast));

    return (
        <div className="grid grid-cols-5 items-center text-gray-600 border-b py-4 gap-4 text-center">
            <div className="flex flex-col items-center">
                <img src={productImage} className="w-20 h-20 object-cover rounded-md" alt={truncateText(productName, 20)} />
                <button onClick={handleRemoveItem} className="mt-2 text-red-500 hover:text-red-700 font-medium flex items-center gap-2">
                    <HiOutlineTrash className="text-lg" /> Remove
                </button>
            </div>
            <div className="text-gray-800 font-medium">{productName}</div>
            <div className="text-gray-900 font-semibold">₹{Number(specialProductPrice)?.toFixed(2)}</div>
            <div className="text-gray-900 font-semibold">
                <SetQuantity 
                    quantity={currentQuantity} 
                    handleQtyIncrease={handleQtyIncrease} 
                    handleQtyDecrease={handleQtyDecrease} 
                />
            </div>
            <div className="text-gray-900 font-semibold">
                ₹{(currentQuantity * Number(specialProductPrice)).toFixed(2)}
            </div>
        </div>
    );
};

export default ItemContent;
