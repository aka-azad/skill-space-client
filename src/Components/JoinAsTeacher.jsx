import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router";

const JoinAsTeacher = () => {
  return (
    <div className="bg-accent bg-opacity-10 py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between p-8">
        <div className="lg:w-1/2">
          <img
            src={"https://i.ibb.co.com/Qfyxbx9/teaching-img.jpg"}
            alt="Join as a Teacher"
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-accent-content">
            Join Us as a Teacher
          </h2>
          <p className="text-lg mb-6">
            Share your knowledge and make a difference in student&apos;s lives.
            By joining our platform, you&apos;ll have the opportunity to teach,
            inspire, and shape the future.
          </p>
          <Link
            to={"/teach-on-skill-space"}
            className="btn btn-primary flex items-center"
          >
            <FaChalkboardTeacher className="mr-2" /> Become a Teacher
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinAsTeacher;
