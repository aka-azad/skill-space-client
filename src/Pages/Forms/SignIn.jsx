import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router";
import { Helmet } from "react-helmet";
import AuthContext from "../../Context/AuthContext";
import SectionTitle from "../../Components/SectionTitle";
import signupSVG from "../../assets/login-animate.svg";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignIn = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signinWithEmailPass, signinWithGoogle } = useContext(AuthContext);

  const onSubmit = (data) => {
    signinWithEmailPass(data.email, data.password)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;

        // Store sign-in info to DB
        axiosPublic
          .post("/users", {
            displayName,
            photoURL,
            email,
            lastSignIn: new Date().toISOString(),
          })
          .then(() => {
            toast.success("Sign in successful!");
            // Handle post response if needed
          })
          .catch((error) => {
            toast.error("Error saving sign-in info: " + error.message);
            console.error("Error saving sign-in info: ", error);
          });
      })
      .catch((error) => {
        toast.error("Error signing in: " + error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signinWithGoogle()
      .then((res) => {
        const { displayName, photoURL, email } = res.user;

        // Store sign-in info to DB if new user, store user to DB
        axiosPublic
          .post("/users", {
            displayName,
            photoURL,
            email,
            lastSignIn: new Date().toISOString(),
          })
          .then(() => {
            toast.success("Google sign-in successful!");
            // Handle post response if needed
          })
          .catch((error) => {
            toast.error("Error saving sign-in info: " + error.message);
            console.error("Error saving sign-in info: ", error);
          });
      })
      .catch((error) => {
        toast.error("Error signing in with Google: " + error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Skill Space | Sign In</title>
        <meta name="description" content="Sign in to skill space" />
      </Helmet>
      <div className="container overflow-hidden mx-auto p-4 grid sm:grid-cols-2">
        <Fade direction="left">
          <div className="sm:pt-10 pb-3">
            <SectionTitle title="Sign In" subtitle="Welcome back" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-sm mx-auto"
            >
              <label className="input input-bordered flex items-center gap-2 mb-4">
                <FaEnvelope className="h-4 w-4 opacity-70" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  className="grow"
                />
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}

              <label className="input input-bordered flex items-center gap-2 mb-4">
                <FaLock className="h-4 w-4 opacity-70" />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="grow"
                />
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary hover:bg-blue-700 font-bold py-2 px-4 rounded"
              >
                Sign In
              </button>
            </form>
            <button
              onClick={handleGoogleSignIn}
              className="bg-red-500 btn mx-auto hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center gap-2"
            >
              <FaGoogle className="h-4 w-4" />
              Sign In with Google
            </button>
            <div className="flex flex-col items-center mt-4">
              <p>
                Don&apos;t have an account?
                <Link to="/signup" className="text-blue-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </Fade>
        <Fade direction="right">
          <div className="hidden sm:flex">
            <img src={signupSVG} alt="Sign In" />
          </div>
        </Fade>
      </div>
    </>
  );
};

export default SignIn;
