import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import{useDispatch, useSelector} from "react-redux";
import { fetchProducts } from "../store/actions";

const Products = () => {
    const isLoading = false;
    const errorMessage = "";
    const {products}=useSelector(
        (state)=>state.products
    )
    const dispatch =useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch])

    console.log()
    /*const products = [
        {
            productId: 2,
            productName: "Bewakoof",
            productDescription: "Latest model tshirt",
            productImage: "https://placehold.co/600x400",
            quantity: 0,
            price: 1000.00,
            discount: 20.0,
            specialProductPrice: 800.00,
        },
        {
            productId: 4,
            productName: "Basics",
            productDescription: "Latest model Shirt",
            productImage: "https://placehold.co/600x400",
            quantity: 20,
            price: 2000.00,
            discount: 25.0,
            specialProductPrice: 1500.00,
        },
        {
            productId: 7,
            productName: "Mufti",
            productDescription: "Latest model Pant",
            productImage: "https://placehold.co/600x400",
            quantity: 10,
            price: 4000.00,
            discount: 25.0,
            specialProductPrice: 3000.00,
        },
        {
            productId: 15,
            productName: "H&M",
            productDescription: "Latest model tshirt",
            productImage: "https://placehold.co/600x400",
            quantity: 500,
            price: 1500.00,
            discount: 20.0,
            specialProductPrice: 1200.00,
        }
    ];*/


    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-[200px]">
                        <FaSpinner className="text-4xl text-blue-500 animate-spin mr-2" />
                        <span className="text-slate-800 text-lg font-medium">
                            Loading...
                        </span>
                    </div>
                ) : errorMessage ? (
                    <div className="flex justify-center items-center h-[200px]">
                        <FaExclamationTriangle className="text-4xl text-red-500 mr-2" />
                        <span className="text-slate-800 text-lg font-medium">
                            {errorMessage}
                        </span>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-[200px]">
                        <FaExclamationTriangle className="text-4xl text-gray-500 mb-4" />
                        <span className="text-slate-800 text-lg font-medium">
                            No products available
                        </span>
                    </div>
                ) : (
                    <div className="min-h-[700px]">
                        <div className="pb-6 pt-14 grid 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 gap-y-6 gap-x-6">
                            {products.map((item, i) => (
                                <ProductCard key={i} {...item} />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Products;