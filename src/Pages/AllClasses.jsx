import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ClassCard from "../Components/ClassCard";
import SectionTitle from "../Components/SectionTitle";
import { Helmet } from "react-helmet-async";
import LottieLoader from "../Components/LottieLoader";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOption, setSortOption] = useState("default");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: classes, error, isLoading } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: () => axiosPublic.get("/classes/available").then((res) => res.data),
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedClasses = classes?.slice().sort((a, b) => {
    let comparison = 0;
    if (sortOption === "name") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortOption === "price") {
      comparison = a.price - b.price;
    } else if (sortOption === "default") {
      comparison = 0;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  if (error) return <div>Error loading classes: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Skill Space | All Courses</title>
        <meta name="description" content="all classes" />
      </Helmet>
      <SectionTitle title="Enroll To Your Desired Courses" subtitle="Take a Knowledge Booster" />
      
      <div className="flex items-center justify-end mb-4">
        <label className="font-bold mr-2">Sort by:</label>
        <select
          className="border bg-primary text-primary-content hover:cursor-pointer p-2 rounded mr-2 focus:outline-none"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <select
          className="border p-2 rounded bg-primary text-primary-content hover:cursor-pointer focus:outline-none"
          value={sortOrder} disabled={sortOption === "default"}
          onChange={handleOrderChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
      {isLoading ? (
        <LottieLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedClasses.map((classItem) => (
            <ClassCard key={classItem._id} classItem={classItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClasses;
