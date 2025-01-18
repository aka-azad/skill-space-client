import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LottieLoader from "../../Components/LottieLoader";

const ApplyForTeaching = () => {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    setDefaultValues({
      name: user?.displayName || "",
      experience: "beginner",
      title: "",
      category: "web-development",
    });
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (newApplication) =>
      axiosSecure.post("/teacher-requests", newApplication),
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherRequests"]);
      toast.success("Application submitted successfully!");
    },
    onError: (error) => {
      toast.error(`Error submitting application: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    const applicationData = {
      ...data,
      email: user?.email || "",
      image: user?.photoURL || "",
      status: "pending",
    };
    mutation.mutate(applicationData);
  };

  if (loading) {
    return <div><LottieLoader/></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <SectionTitle
        title="Apply for Becoming a teacher"
        subtitle={"Be the light house for Future"}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <label className="block mb-4">
          Name
          <input
            type="text"
            defaultValue={user?.displayName}
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </label>

        <label className="block mb-4">
          Image URL
          <input
            type="text"
            value={user?.photoURL || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </label>

        <label className="block mb-4">
          Email
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </label>

        <label className="block mb-4">
          Experience
          <select
            {...register("experience", { required: "Experience is required" })}
            className="select select-bordered w-full"
          >
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}
        </label>

        <label className="block mb-4">
          Title
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </label>

        <label className="block mb-4">
          Category
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="web-development">Web Development</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="data-science">Data Science</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="project-management">Project Management</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Submit for Review
        </button>
      </form>
    </div>
  );
};

export default ApplyForTeaching;
