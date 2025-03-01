import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModel from "./ProductViewModel";
import truncateText from "../../utils/truncateText";
import{useDispatch} from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
    productId,
    productName,
    productDescription,
    productImage,
    quantity,
    price,
    discount,
    specialProductPrice,
}) => {
    const [openProductViewModel, setOpenProductViewModel] = useState(false);
    const buttonLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch=useDispatch();
    const handleProductView = (product) => {
        setSelectedViewProduct(product);
        setOpenProductViewModel(true);
    };

    const addToCartHandler=(cartItems)=>{
        dispatch(addToCart(cartItems,1,toast));
    }
    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 bg-white hover:shadow-2xl">
            <div onClick={() => { handleProductView({
                id: productId,
                productName,
                productDescription,
                productImage,
                quantity,
                price,
                discount,
                specialProductPrice,
            })}} className="w-full overflow-hidden aspect-[3/2] relative cursor-pointer">
                <img className="w-full h-full transition-transform duration-300 transform hover:scale-105"
                    src={productImage} alt={productName}>
                </img>
                <span className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-bold ${isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {isAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
            <div className="p-4">
                <h2 onClick={() => { handleProductView({
                    id: productId,
                    productName,
                    productDescription,
                    productImage,
                    quantity,
                    price,
                    discount,
                    specialProductPrice,
                })}} className="text-lg font-semibold mb-2 cursor-pointer">{truncateText(productName,50)}</h2>
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{truncateText(productDescription,80)}</p>
                </div>
                <div className="flex items-center justify-between">
                    {specialProductPrice ? (
                        <div className="flex flex-col">
                             <span className="text-gray-400 line-through">₹{Number(price).toFixed(2)}</span>
                            <span className="text-xl font-bold text-slate-700">₹{Number(specialProductPrice).toFixed(2)}</span>
                        </div>
                    ) : (
                        <div>
                            <span className="text-xl font-bold text-slate-700">₹{Number(price).toFixed(2)}</span>
                        </div>
                    )}
                    <button 
                    disabled={!isAvailable || buttonLoader}
                    onClick={() =>addToCartHandler({
                        productImage,
                        productName,
                        productDescription,
                        specialProductPrice,
                        price,
                        productId,
                        quantity,
                    })}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg items-center duration-300 flex justify-center ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70 cursor-not-allowed"}`}>
                        <FaShoppingCart className="mr-2" />
                        {isAvailable ? "Add to cart" : "Stock out"}
                    </button>
                </div>
            </div>
            <ProductViewModel
                open={openProductViewModel}
                setOpen={setOpenProductViewModel}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    );
}

export default ProductCard;