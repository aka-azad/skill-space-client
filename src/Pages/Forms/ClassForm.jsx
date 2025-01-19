import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle";

const ClassForm = () => {
  const { user } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    user &&
      setDefaultValues({
        name: user?.displayName || "",
        email: user?.email || "",
      });
  }, [user]);
  const mutation = useMutation({
    mutationFn: (newClass) => axiosSecure.post("/classes", newClass),
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      queryClient.invalidateQueries(["myClasses"]);
      navigate("/dashboard/my-class");
    },
    onError: (error) => {
      toast.error(`Error adding class: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    const classData = {
      ...data,
      status: "pending",
      name: user?.displayName,
      email: user?.email,
    };
    mutation.mutate(classData);
  };

  return (
    <div className="container mx-auto p-4">
      <SectionTitle
        title="Add A Class"
        subtitle={"And Wait For Admin Approval"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4"
      >
        <label className="block">
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

        <label className="block">
          Name
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          Email
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          Price
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="input input-bordered w-full"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </label>

        <label className="block">
          Description
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </label>

        <label className="block">
          Image URL
          <input
            type="url"
            {...register("image", { required: "Image URL is required" })}
            className="input input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
