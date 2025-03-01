import { useDispatch, useSelector } from 'react-redux'; 
import HeroBanner from './HeroBanner'; 
import { useEffect } from 'react'; 
import { fetchProducts } from '../../store/actions'; 
import ProductCard from '../shared/ProductCard'; 
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa'; 

const Home = () => {
  const dispatch = useDispatch(); 
  const { products } = useSelector((state) => state.products); 
  const { isLoading, errorMessage } = useSelector((state) => state.errors); 

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroBanner className="h-[600px]" /> {/* Increased banner height */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 mt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">Explore Our Products</h1>
          <p className="text-xl text-gray-600 mt-2">
            Discover our hand-picked products curated just for you.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <FaSpinner className="text-4xl text-blue-500 animate-spin mr-2" />
            <span className="text-slate-800 text-lg font-medium">Loading... Please wait</span>
          </div>
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-48">
            <FaExclamationTriangle className="text-4xl text-red-500 mr-2" />
            <span className="text-slate-800 text-lg font-medium">{errorMessage}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.slice(0, 4).map((item) => (
                <ProductCard key={item.id || `${item.name}-${item.price}`} {...item} />
              ))
            ) : (
              <div className="col-span-full text-center text-lg text-gray-600">
                No products available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
