import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../Context/AuthContext";
import SectionTitle from "../../Components/SectionTitle";
import signupSVG from "../../assets/login-animate.svg";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
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

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationState = location.state;
  const setRoute = locationState?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signinWithEmailPass, signinWithGoogle } = useContext(AuthContext);

  const saveUserMutation = useMutation({
    mutationFn: (user) => axiosPublic.post("/users", user),
    onSuccess: () => {
      toast.success("Sign in successful!");
      queryClient.invalidateQueries(["users"]);
      navigate(setRoute);
    },
    onError: (error) => {
      toast.error("Error saving sign-in info: " + error.message);
      console.error("Error saving sign-in info: ", error);
    },
  });

  const onSubmit = (data) => {
    signinWithEmailPass(data.email, data.password)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;

        const userInfo = {
          displayName,
          photoURL,
          email,
          lastSignIn: new Date().toISOString(),
        };
        saveUserMutation.mutate(userInfo);
      })
      .catch((error) => {
        toast.error("Error signing in: " + error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signinWithGoogle()
      .then((res) => {
        const { displayName, photoURL, email } = res.user;

        const userInfo = {
          displayName,
          photoURL,
          email,
          lastSignIn: new Date().toISOString(),
        };
        saveUserMutation.mutate(userInfo);
      })
      .catch((error) => {
        toast.error("Error signing in with Google: " + error.message);
      });
  };

  const handleDemoSignIn = (role) => {
    const demoUsers = {
      Student: { email: "student@email.com", password: "Student1234" },
      Teacher: { email: "teacher@email.com", password: "Teacher1234" },
      Admin: { email: "admin@admin.com", password: "Admin1234" },
    };
    const user = demoUsers[role];
    if (user) {
      onSubmit(user);
    }
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
            <div className="text-center mb-4">
              <p className="text-lg mb-3 font-bold">Demo Users</p>
              <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDemoSignIn("Student")}
                className="btn btn-primary hover:bg-blue-700 font-bold py-2 px-4 rounded"
              >
                Student
              </button>
              <button
                onClick={() => handleDemoSignIn("Teacher")}
                className="btn btn-primary hover:bg-blue-700 font-bold py-2 px-4 rounded"
              >
                Teacher
              </button>
              <button
                onClick={() => handleDemoSignIn("Admin")}
                className="btn btn-primary hover:bg-blue-700 font-bold py-2 px-4 rounded"
              >
                Admin
              </button>
            </div>
            </div>
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
                <p className="text-red-500 text-xs italic mb-1">
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
                <p className="text-red-500 mb-1 text-xs italic">
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
                Don&apos;t have an account?{" "}
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
