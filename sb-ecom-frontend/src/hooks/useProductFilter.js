import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions";


const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        // Page Number
        const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        params.set("pageNumber", currentPage - 1);

        //  Always sort by price
        const sortOrder = searchParams.get("sortOrder") || "asc"; 
        params.set("sortBy", "price"); 
        params.set("sortOrder", sortOrder);

        // Category & Search
        const categoryParams = searchParams.get("category") || "";
        const keyword = searchParams.get("keyword") || "";

        if (categoryParams) {
            params.set("category", categoryParams);
        }
        if (keyword) {
            params.set("keyword", keyword);
        }

        // Convert to Query String
        const queryString = params.toString();
        console.log(queryString); // Debugging

        dispatch(fetchProducts(queryString));
    }, [dispatch, searchParams]);
};

export default useProductFilter;
