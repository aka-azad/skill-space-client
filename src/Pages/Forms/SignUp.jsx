import  { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";
import SectionTitle from "../../Components/SectionTitle";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUserWithEmailPass, signinWithGoogle } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUserWithEmailPass(data.email, data.password)
  .then((res) => {
    // Successfully signed up
    const user = res.user;
    user.updateProfile({
      displayName: data.name,
      photoURL: data.photoURL,
    }).then(() => {
      toast.success("Sign up successful!");
      // Save user info to DB
    }).catch((error) => {
      console.error("Error updating profile: ", error);
      toast.error("Error updating profile: " + error.message);
    });
  })
  .catch((error) => {
    toast.error("Error signing up: " + error.message);
  });

  };

  const handleGoogleSignIn = () => {
    signinWithGoogle()
      .then(() => {
        toast.success("Google sign-in successful!");
        // Save user info to DB
      })
      .catch((error) => {
        toast.error("Error signing in with Google: " + error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SectionTitle title="Sign Up" subtitle="Create your account" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
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
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
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
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <FaLock className="h-4 w-4 opacity-70" />
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="grow"
          />
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
            {...register("photoURL", { required: "Photo URL is required" })}
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center gap-2"
      >
        <FaGoogle className="h-4 w-4" />
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
