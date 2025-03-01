import { FaStore, FaRegAddressCard, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="w-full bg-gray-50 py-16 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* About Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Welcome to E-Shop, your one-stop online store for all things fashion, gadgets, home decor, and more! We're committed to providing you with the best products at affordable prices, with a focus on quality, convenience, and customer satisfaction.
          </p>
        </div>

        {/* Mission Statement Section */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-50 p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At E-Shop, our mission is to revolutionize online shopping by offering high-quality products at unbeatable prices. We aim to deliver a seamless shopping experience with fast shipping and excellent customer service.
          </p>
        </div>

        {/* Company Info Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Info Card 1 */}
          <div className="w-full p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <FaStore className="text-6xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Store</h3>
            <p className="text-lg text-gray-600">
              Visit our online store for the latest in fashion, gadgets, home decor, and more. Our curated collections ensure that you'll find something that suits your style and needs.
            </p>
          </div>

          {/* Info Card 2 */}
          <div className="w-full p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <FaRegAddressCard className="text-6xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Location</h3>
            <p className="text-lg text-gray-600">
              Although we're an online store, we are based in the heart of the city. Our team works tirelessly to ensure your orders are fulfilled with the highest level of professionalism and care.
            </p>
          </div>

          {/* Info Card 3 */}
          <div className="w-full p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <FaPhoneAlt className="text-6xl text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Support</h3>
            <p className="text-lg text-gray-600">
              Our customer support team is here for you. Whether you have a question or need assistance with your order, we are always just a call or email away.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16">
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
