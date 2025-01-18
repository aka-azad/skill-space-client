import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "./SectionTitle";
import ReactStars from "react-rating-stars-component";
import SmallLottieLoader from "./SmallLottieLoader";

const FeedbackOfStudents = () => {
  const axiosPublic = useAxiosPublic();
  const [feedbacksWithClassTitles, setFeedbacksWithClassTitles] = useState([]);

  const {
    data: feedbacks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => axiosPublic.get("/evaluations").then((res) => res.data),
  });

  useEffect(() => {
    const fetchClassTitles = async () => {
      if (feedbacks) {
        const feedbacksWithTitles = await Promise.all(
          feedbacks.map(async (feedback) => {
            const classInfo = await axiosPublic
              .get(`/class/${feedback.classId}`)
              .then((res) => res.data);
            return { ...feedback, classTitle: classInfo.title };
          })
        );
        setFeedbacksWithClassTitles(feedbacksWithTitles);
      }
    };

    fetchClassTitles();
  }, [feedbacks, axiosPublic]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (error) return <div>Error loading feedbacks: {error.message}</div>;

  return (
    <div className="py-12 bg-base-200">
      <div className="container mx-auto">
        <SectionTitle title="Feedback From Our Students" />
        {isLoading ? (
          <SmallLottieLoader />
        ) : (
          <div className="p-16 bg-white bg-opacity-45 rounded-md backdrop-blur-md">
            <Slider {...settings}>
              {feedbacksWithClassTitles.map((feedback) => (
                <div key={feedback._id} className="p-4">
                  <div className="bg-accent bg-opacity-25 p-4 shadow rounded-sm h-full flex flex-col items-center">
                    <img
                      src={feedback.userImage}
                      alt={feedback.userName}
                      className="w-20 h-20 object-cover rounded-full mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2 text-center">
                      {feedback.userName}
                    </h3>
                    <p className="mb-2 text-center">
                      <strong>Class:</strong> {feedback.classTitle}
                    </p>
                    <p className="mb-2 text-center">{feedback.description}</p>
                    <div className="mb-4">
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                        value={feedback.rating}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackOfStudents;
