import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaGoogle,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import AuthContext from "../../Context/AuthContext";
import SectionTitle from "../../Components/SectionTitle";
import signupSVG from "../../assets/sign-up-animate.svg";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const regexValidate = {
  minLength: (value) =>
    value.length >= 6 || "Password must be at least 6 characters long",
  hasUpperCase: (value) =>
    /[A-Z]/.test(value) ||
    "Password must contain at least one uppercase letter",
  hasLowerCase: (value) =>
    /[a-z]/.test(value) ||
    "Password must contain at least one lowercase letter",
  hasNumber: (value) =>
    /\d/.test(value) || "Password must contain at least one number",
};

const SignUp = () => {
  const { createUserWithEmailPass, signinWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveUserMutation = useMutation({
    mutationFn: (newUser) => axiosPublic.post("/users", newUser),
    onSuccess: () => {
      toast.success("User saved successfully!");
      queryClient.invalidateQueries(["users"]);
      navigate("/");
      window.location.reload()
    },
    onError: (error) => {
      toast.error("Error saving user info: " + error.message);
      console.error("Error saving user info: ", error);
    },
  });

  const onSubmit = (data) => {
    createUserWithEmailPass(data.email, data.password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: data.name,
          photoURL: data.photoURL,
        })
          .then(() => {
            const newUser = {
              displayName: data.name,
              photoURL: data.photoURL,
              email: data.email,
              role: "student",
              lastSignIn: new Date().toISOString(),
            };
            saveUserMutation.mutate(newUser);
          })
          .catch((error) => {
            toast.error("Error updating profile: " + error.message);
            console.error("Error updating profile: ", error);
          });
      })
      .catch((error) => {
        toast.error("Error signing up: " + error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signinWithGoogle()
      .then((res) => {
        const { displayName, photoURL, email } = res.user;

        const newUser = {
          displayName,
          photoURL,
          email,
          role: "student",
          lastSignIn: new Date().toISOString(),
        };
        saveUserMutation.mutate(newUser);
      })
      .catch((error) => {
        toast.error("Error signing in with Google: " + error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Skill Space | Signup</title>
        <meta name="description" content="Signup to skill space" />
      </Helmet>
      <div className="container overflow-hidden mx-auto p-4 grid sm:grid-cols-2">
        <Fade direction="left">
          <div className="sm:pt-10 pb-3">
            <SectionTitle title="Sign Up" subtitle="Create your account" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-sm mx-auto"
            >
              <label className="input input-bordered flex items-center gap-2 mb-4">
                <FaUser className="h-4 w-4 opacity-70" />
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                  className="grow"
                />
              </label>
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}

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
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    validate: regexValidate,
                  })}
                  className="grow"
                />
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}

              <label className="input input-bordered flex items-center gap-2 mb-4">
                <FaImage className="h-4 w-4 opacity-70" />
                <input
                  id="photoURL"
                  type="url"
                  placeholder="Photo URL"
                  {...register("photoURL", {
                    required: "Photo URL is required",
                  })}
                  className="grow"
                />
              </label>
              {errors.photoURL && (
                <p className="text-red-500 text-xs italic">
                  {errors.photoURL.message}
                </p>
              )}

              <button
                type="submit"
                className="bg-blue-500 btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </form>
            <button
              onClick={handleGoogleSignIn}
              className="bg-red-500 btn mx-auto hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center gap-2"
            >
              <FaGoogle className="h-4 w-4" />
              Sign Up with Google
            </button>

            <div className="flex flex-col items-center mt-4">
              <p>
                Have an account?{" "}
                <Link to="/sign-in" className="text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Fade>
        <Fade direction="right">
          <div className="hidden sm:flex">
            <img src={signupSVG} alt="Sign Up" />
          </div>
        </Fade>
      </div>
    </>
  );
};

export default SignUp;
