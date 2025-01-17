import Lottie from "lottie-react";
import lottieLooking from "../assets/Lottie-loader.json";

const SmallLottieLoader = () => {
  return (
    <div className="w-[50px] mx-auto">
      <Lottie style={{ flex: 1 }} animationData={lottieLooking} height={8} />
    </div>
  );
};

export default SmallLottieLoader;
