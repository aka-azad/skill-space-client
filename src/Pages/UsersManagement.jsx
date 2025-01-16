import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "../Components/SectionTitle";

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
    // enabled: searchQuery.length > 0,
  });

  const makeAdminMutation = useMutation({
    mutationFn: (email) =>
      axiosPublic.put(`/users/${email}`, { authorization: "admin" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users", searchQuery]);
    },
  });

  const handleMakeAdmin = (email) => {
    makeAdminMutation.mutate(email);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("searchQuery");
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto p-4">
      <SectionTitle title="Users Management" subtitle={'Make anyone admin'} />
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search by username or email"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading users: {error.message}</div>}
      {users && (
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
      )}
    </div>
  );
};

export default UsersManagement;
