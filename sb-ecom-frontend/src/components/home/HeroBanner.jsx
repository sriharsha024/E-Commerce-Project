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
  return (
    <div className="w-full max-w-screen-xl mx-auto py-6 px-4">
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
        className="rounded-lg shadow-lg"
      >
        {bannerList.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[450px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10"></div>

              {/* Left Content - Text */}
              <div className="absolute z-10 text-white text-center px-6 md:px-12">
                <h3 className="text-lg md:text-2xl font-medium">{item.title}</h3>
                <h1 className="text-2xl md:text-5xl font-bold mt-2">{item.subtitle}</h1>
                <p className="mt-4 text-md md:text-lg">{item.description}</p>
                <Link
                  to="/products"
                  className="mt-6 inline-block bg-white text-black py-2 px-6 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Shop Now
                </Link>
              </div>

              {/* Right Content - Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
