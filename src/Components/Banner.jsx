import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typewriter } from "react-simple-typewriter";
import { useRef } from "react";

const Banner = () => {
  const imgLinks = [
    {
      link: "https://blogbymichele.wordpress.com/wp-content/uploads/2023/04/success.jpg",
      text: "Empower Ideas, Fund Futures",
    },
    {
      link: "https://i.ibb.co.com/dPmx9bR/DALL-E-2025-01-14-15-38-16-A-visually-engaging-depiction-of-skill-building-through-online-education.webp",
      text: "Invest in Innovation",
    },
    {
      link: "https://i.ibb.co.com/GtryLxQ/DALL-E-2025-01-14-15-39-04-A-modern-online-teaching-scene-showing-a-teacher-conducting-a-virtual-cla.webp",
      text: "Teach For Greater Future",
    },
    {
      link: "https://i.ibb.co.com/t81SC87/pexels-julia-m-cameron-4144923.jpg",
      text: "Learn What you'r interested in",
    },
    {
      link: "https://i.ibb.co.com/F7bgy8t/pexels-julia-m-cameron-4145153.jpg",
      text: "Screen time! that is not bad for future",
    },
  ];
  const progressContent = useRef(null);
  // https://ibb.co.com/cDsPTDG
  // https://ibb.co.com/dK0GVky
  // https://ibb.co.com/nnK9vgM
  // https://ibb.co.com/PcD0pTd

  return (
    <div className="container mx-auto mt-8 mb-11">
      <Swiper
        navigation={true}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {imgLinks.map((slide, i) => (
          <SwiperSlide key={i} className="relative">
            <img
              className="w-full max-h-[70vh] rounded-2xl overflow-hidden object-center object-cover"
              src={slide.link}
              alt={`slide-${i}`}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
              <h2 className="text-4xl text-white font-bold text-center px-4">
                <Typewriter
                  words={[slide.text]}
                  loop={1}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                />
              </h2>
            </div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
