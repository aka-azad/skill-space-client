import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";

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
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    user &&
      setDefaultValues({
        name: user?.displayName || "",
        email: user?.email || "",
      });
  }, [user]);
  const mutation = useMutation({
    mutationFn: (newClass) => axiosPublic.post("/classes", newClass),
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      queryClient.invalidateQueries(["myClasses"]);
      navigate("/my-classes");
    },
    onError: (error) => {
      toast.error(`Error adding class: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    const classData = {
      ...data,
      status: "pending",
    };
    mutation.mutate(classData);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a Class</h2>
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
