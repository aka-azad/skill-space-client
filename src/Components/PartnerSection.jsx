import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaApple,
  FaMicrosoft,
  FaAmazon,
  FaGoogle,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import SectionTitle from "./SectionTitle";

const partnerData = [
  {
    icon: <FaApple className="text-primary"/>,
    name: "Apple Inc.",
    description:
      "Apple Inc. is a leading technology company known for its innovative products and services.",
  },
  {
    icon: <FaMicrosoft className="text-primary"/>,
    name: "Microsoft Corp.",
    description:
      "Microsoft Corp. specializes in software, consumer electronics, personal computers, and related services.",
  },
  {
    icon: <FaAmazon className="text-primary"/>,
    name: "Amazon.com",
    description:
      "Amazon.com is a multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.",
  },
  {
    icon: <FaGoogle className="text-primary"/>,
    name: "Google LLC",
    description:
      "Google LLC is a global technology company specializing in internet-related services and products.",
  },
  {
    icon: <FaFacebook className="text-primary"/>,
    name: "Facebook Inc.",
    description:
      "Facebook Inc. is a social media giant that provides social networking services and products.",
  },
  {
    icon: <FaTwitter className="text-primary"/>,
    name: "Twitter Inc.",
    description:
      "Twitter Inc. is a micro-blogging and social networking service where users post and interact with messages known as tweets.",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-12  bg-base-200">
      <div className="container mx-auto max-w-[1280px] mx-auto">
        <SectionTitle title="Our Partners" subtitle="We Work Together" />
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
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
          {partnerData.map((partner, index) => (
            <SwiperSlide
              key={index}
              className="text-center p-4 bg-base-100 rounded-lg shadow-md"
            >
              <div className="w-fit mx-auto">
                <p className="text-6xl mb-4 ">{partner.icon}</p>
              </div>
              <p className="text-lg font-semibold mb-2 flex-grow">
                {partner.name}
              </p>
              <div className="h-20">
                <p className="text-base">{partner.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnersSection;
