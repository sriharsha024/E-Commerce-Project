import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { bannerList } from "../../utils";

const HeroBanner = () => {
  // Array of background colors for each banner
  const bannerColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500'];

  return (
    <div className="w-full max-w-screen-xl mx-auto py-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <Swiper
        effect="fade"
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="rounded-lg shadow-xl overflow-hidden"
      >
        {bannerList.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div
              className={`relative w-full h-[450px] md:h-[500px] flex items-center justify-between ${bannerColors[index % bannerColors.length]} rounded-lg overflow-hidden`}
            >
              {/* Left Content - Text */}
              <div className="relative z-10 text-white text-left px-6 md:px-12 lg:px-16 xl:px-24 w-full sm:w-1/2">
                <h3 className="text-lg md:text-2xl font-medium">{item.title}</h3>
                <h1 className="text-2xl md:text-5xl font-bold mt-4">{item.subtitle}</h1>
                <p className="mt-4 text-md md:text-lg">{item.description}</p>
                <Link
                  to="/products"
                  className="mt-6 inline-block bg-white text-black py-3 px-8 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>

              {/* Right Content - Image */}
              <div className="relative w-full sm:w-1/2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
