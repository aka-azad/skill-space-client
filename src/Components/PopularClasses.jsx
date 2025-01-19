import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "./SectionTitle";
import ClassCard from "./ClassCard";
import SmallLottieLoader from "./SmallLottieLoader";

const PopularClasses = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: popularClasses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: () => axiosPublic.get("/classes/popular").then((res) => res.data),
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (error) return <div>Error loading popular classes: {error.message}</div>;

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="py-12 container mx-auto w-11/12">
        <SectionTitle title="Popular Now" />
        {isLoading ? (
          <SmallLottieLoader />
        ) : (
          <Slider {...settings} autoplay={true} autoplaySpeed={3000}>
            {popularClasses.map((classItem) => (
              <div key={classItem._id} className="p-4">
                <ClassCard classItem={classItem} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default PopularClasses;
