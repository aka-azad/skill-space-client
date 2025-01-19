import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from "prop-types";
import AuthContext from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import SmallLottieLoader from "../../Components/SmallLottieLoader";

const CheckoutForm = ({ id }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();

  const {
    data: classItem,
    error: fetchError,
    isLoading: classLoading,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: () => axiosPublic.get(`/class/${id}`).then((res) => res.data),
  });

  const { data: enrollmentCheck, isLoading: enrollmentCheckLoading } = useQuery(
    {
      queryKey: ["enrollmentCheck", id, user?.email],
      queryFn: () =>
        axiosSecure
          .get(`/enrollments/check?classId=${id}&userEmail=${user.email}`)
          .then((res) => res.data),
      enabled: !!user?.email,
    }
  );

  const {
    data: clientSecretData,
    error: clientSecretFetchError,
    isLoading: clientSecretLoading,
  } = useQuery({
    queryKey: ["clientSecret", id],
    queryFn: () =>
      axiosSecure
        .post(`/create-payment-intent`, { price: classItem?.price })
        .then((res) => res.data),
    enabled: !!classItem,
  });

  const mutation = useMutation({
    mutationFn: (transactionId) =>
      axiosSecure.post(`/payments`, {
        classId: id,
        amount: classItem.price,
        userEmail: user.email,
        transactionId: transactionId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["enrolledClasses"]);
      toast.success("Payment processed successfully!");
      navigate("/dashboard/enrolled-classes");
    },
    onError: (error) => {
      toast.error(`Error processing payment: ${error.response.data.message}`);
    },
  });

  const handlePayment = (transactionId) => {
    mutation.mutate(transactionId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else if (paymentMethod) {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecretData.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.name,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setError(confirmError.message);
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        handlePayment(paymentIntent.id);
      }
    }
  };

  if (classLoading || clientSecretLoading || enrollmentCheckLoading)
    return <SmallLottieLoader />;
  if (fetchError)
    return <div>Error loading class details: {fetchError.message}</div>;
  if (clientSecretFetchError)
    return (
      <div>Error loading payment details: {clientSecretFetchError.message}</div>
    );
  if (enrollmentCheck?.exists)
    return <div>You are already enrolled in this class.</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn mt-5 btn-primary w-full"
          type="submit"
          disabled={!stripe || !clientSecretData}
        >
          Pay Now
        </button>
        {!clientSecretData && (
          <p className="text-error">
            Unable to communicate with server! Please try again later.
          </p>
        )}
      </form>
      {error && <p className="text-error">{error}</p>}
      {transactionId && (
        <p className="text-success">Transaction Id: {transactionId}</p>
      )}
    </div>
  );
};

CheckoutForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CheckoutForm;
