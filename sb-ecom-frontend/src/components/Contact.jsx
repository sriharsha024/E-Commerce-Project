import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="w-full bg-gray-200 py-16 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Contact Header Section */}
        <div className="mb-12 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Have a question, comment, or need support? We'd love to hear from you! Our team is here to assist you.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {/* Phone */}
          <div className="p-8 bg-white shadow-xl rounded-2xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <FaPhoneAlt className="text-6xl text-blue-600 mb-6 transition-all duration-300" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-lg text-gray-600">+1 (800) 123-4567</p>
          </div>

          {/* Email */}
          <div className="p-8 bg-white shadow-xl rounded-2xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <FaEnvelope className="text-6xl text-purple-600 mb-6 transition-all duration-300" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-lg text-gray-600">support@eshop.com</p>
          </div>

          {/* Address */}
          <div className="p-8 bg-white shadow-xl rounded-2xl text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <FaMapMarkerAlt className="text-6xl text-green-600 mb-6 transition-all duration-300" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-lg text-gray-600">123 E-Shop St, City, State, 12345</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-10 sm:p-12 md:p-16 shadow-lg rounded-xl max-w-4xl mx-auto mt-16 mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">
            Send Us a Message
          </h2>
          <form action="#" method="POST">
            {/* Full Name Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="name" className="block text-lg text-gray-700 font-medium mb-2">
                  Full Name
                </label>
              </div>
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-5 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email Address Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="email" className="block text-lg text-gray-700 font-medium mb-2">
                  Email Address
                </label>
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-5 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Contact Number Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="phone" className="block text-lg text-gray-700 font-medium mb-2">
                  Contact Number
                </label>
              </div>
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-5 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Message Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="message" className="block text-lg text-gray-700 font-medium mb-2">
                  Your Message
                </label>
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows="8"
                  className="w-full p-5 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none transition-all duration-200"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <a
            href="/"
            className="inline-block px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
