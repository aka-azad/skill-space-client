import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "../Components/SectionTitle";
import "react-toastify/dist/ReactToastify.css";
import LottieLoader from "../Components/LottieLoader";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Forms/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: classItem,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: () => axiosPublic.get(`/class/${id}`).then((res) => res.data),
  });

  if (error) return <div>Error loading class details: {error.message}</div>;

  return (
    <div className="container max-w-screen-md mx-auto p-4">
      {isLoading ? (
        <LottieLoader />
      ) : (
        <>
          <SectionTitle title={`Payment for ${classItem?.title}`} />
          <p className=" mb-4">Price: ${classItem?.price}</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id} price={classItem?.price} />
          </Elements>
        </>
      )}
    </div>
  );
};

export default Payment;
