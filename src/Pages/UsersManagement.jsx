import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LottieLoader from "../Components/LottieLoader";

const UsersManagement = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: usersData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users", searchQuery, currentPage],
    queryFn: () =>
      axiosSecure
        .get(`/users?query=${searchQuery}&page=${currentPage}&limit=10`)
        .then((res) => res.data),
    keepPreviousData: true,
  });

  const makeAdminMutation = useMutation({
    mutationFn: (email) =>
      axiosSecure.put(`/users/${email}`, { authorization: "admin" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users", searchQuery, currentPage]);
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

  const totalPages = usersData ? Math.ceil(usersData.totalUsers / 10) : 1;

  return (
    <div className="container mx-auto p-4">
      <SectionTitle title="Users Management" subtitle={"Make anyone admin"} />
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
      {isLoading && <LottieLoader />}
      {error && <div>Error loading users: {error.message}</div>}
      <div className="w-full overflow-auto mb-20">
        {usersData && (
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
              {usersData.users.map((user) => (
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
      {usersData && (
        <div className="fixed bottom-0 right-0 ml-auto w-full flex justify-between items-center bg-base-200 p-4 border-t border-gray-300 z-[10000]">
          <div>
            Total Users: {usersData ? usersData.totalUsers : 0} | Displaying:{" "}
            {usersData ? usersData.users.length : 0} users
          </div>
          <div className="join">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`join-item btn ${
                  index + 1 === currentPage ? "btn-active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
