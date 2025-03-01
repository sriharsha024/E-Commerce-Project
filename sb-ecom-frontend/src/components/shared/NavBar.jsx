import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Badge } from '@mui/material'; // Import Badge from Material-UI
import { useState } from 'react';

const NavBar = ({ user, cart }) => {
  const location = useLocation();
  const path = location.pathname;
  const cartItemCount = cart?.length || 0; // Dynamically set the cart item count
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to apply styles based on active path
  const getLinkClass = (currentPath) => 
    path === currentPath ? 'text-white' : 'text-gray-400 hover:text-white';

  return (
    <div className="bg-gray-900 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <FaStore className="text-3xl" />
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
            E-Shop
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Correctly toggle the mobile menu
        >
          <FaStore className="text-3xl" />
        </button>

        {/* Navbar Links */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} lg:flex space-x-6`}>
          <ul className="flex flex-col lg:flex-row space-x-0 lg:space-x-6">
            <li>
              <Link to="/" className={`${getLinkClass('/')}`} style={{ fontSize: '18px' }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className={`${getLinkClass('/products')}`} style={{ fontSize: '18px' }}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className={`${getLinkClass('/about')}`} style={{ fontSize: '18px' }}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`${getLinkClass('/contact')}`} style={{ fontSize: '18px' }}>
                Contact
              </Link>
            </li>

            {/* Cart Icon */}
            <li className="font-[500] transition-all duration-150">
              <Link className={`${path === "/cart" ? "text-white font-semibold" : "text-gray-200"}`} to="/cart">
                <Badge
                  showZero
                  badgeContent={cartItemCount}
                  color="primary"
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <FaShoppingCart size={25} />
                </Badge>
              </Link>
            </li>

            {/* User Menu or Login Button */}
            {user && user.id ? (
              <li className="font-[500] transition-all duration-150">
                <UserMenu />
              </li>
            ) : (
              <li className="font-[500] transition-all duration-150">
                <Link
                  className="flex items-center space-x-2 px-4 py-[6px] bg-gradient-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform"
                  to="/login"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
 