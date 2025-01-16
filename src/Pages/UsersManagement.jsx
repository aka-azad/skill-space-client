import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const UsersManagement = () => {
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: () =>
      axiosPublic.get(`/users?query=${searchQuery}`).then((res) => res.data),
  });

  const makeAdminMutation = useMutation({
    mutationFn: (email) =>
      axiosPublic.put(`/users/${email}`, { authorization: "admin" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleMakeAdmin = (email) => {
    makeAdminMutation.mutate(email);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      <input
        type="text"
        placeholder="Search by username or email"
        value={searchQuery}
        onChange={handleSearch}
        className="input input-bordered w-full mb-4"
      />
      <table className="table w-full">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Make Admin</th>
            <th>User Image</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>
                {user.authorization === "admin" ? (
                  <button className="btn btn-success" disabled>
                    Admin
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => handleMakeAdmin(user.email)}
                  >
                    Make Admin
                  </button>
                )}
              </td>
              <td>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
