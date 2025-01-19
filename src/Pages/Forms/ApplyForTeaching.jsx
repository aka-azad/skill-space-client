import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LottieLoader from "../../Components/LottieLoader";

const ApplyForTeaching = () => {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [applicationStatus, setApplicationStatus] = useState(null);

  const { data: applicationData, isLoading: applicationLoading } = useQuery({
    queryKey: ["applicationData", user?.email],
    queryFn: () =>
      axiosSecure.get(`/teachers/${user?.email}`).then((res) => res.data),
    enabled: !loading,
  });

  useEffect(() => {
    if (applicationData) {
      setApplicationStatus(applicationData.status);
    }
  }, [applicationData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      experience: "beginner",
      title: "",
      category: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newApplication) =>
      axiosSecure.post("/teacher-requests", newApplication),
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherRequests"]);
      toast.success("Application submitted successfully!");
      setApplicationStatus("pending");
    },
    onError: (error) => {
      toast.error(`Error submitting application: ${error.message}`);
    },
  });
  const resubmitMutation = useMutation({
    mutationFn: (updatedApplication) =>
      axiosSecure.put(`/teacher-requests/${applicationData._id}`, updatedApplication),
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherRequests"]);
      toast.success("Application submitted successfully!");
      setApplicationStatus("pending");
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

  const handleResubmit = () => {
    resubmitMutation.mutate({
      ...applicationData,
      status: "pending",
    });
  };

  if (loading || applicationLoading) {
    return (
      <div>
        <LottieLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <SectionTitle
        title="Apply for Becoming a teacher"
        subtitle={"Be the light house for Future"}
      />

      {applicationStatus === "accepted" ? (
        <div className="text-center">
          <p className="text-lg text-green-500">You are already a teacher.</p>
        </div>
      ) : applicationStatus === "pending" ? (
        <div className="text-center">
          <p className="text-lg text-yellow-500">
            Your application is under review.
          </p>
        </div>
      ) : applicationStatus === "rejected" ? (
        <div className="text-center">
          <p className="text-lg text-red-500">Your application was rejected.</p>
          <button onClick={handleResubmit} className="btn btn-primary mt-4">
            Request to another review
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <label className="block mb-4">
            Name
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
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
              {...register("experience", {
                required: "Experience is required",
              })}
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
      )}
    </div>
  );
};

export default ApplyForTeaching;
