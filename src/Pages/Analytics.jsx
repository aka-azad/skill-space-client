import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SmallLottieLoader from "../Components/SmallLottieLoader";
import { FaChalkboardTeacher, FaGraduationCap, FaUsers, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CourseSalesChart from "../Components/CourseSalesChart";

const Analytics = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {
        data: stats,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => {
            const statsRes = await axiosPublic.get("/stats");
            const revenueRes = await axiosSecure.get("/revenue"); 
            return {
                ...statsRes.data,
                totalRevenue: revenueRes.data.totalRevenue, 
            };
        },
    });

    if (error) return <div>Error loading stats: {error.message}</div>;

    return (
        <div>
            <div className="py-12 max-w-[1280px] mx-auto">
                {isLoading ? (
                    <SmallLottieLoader />
                ) : (
                    <div className="container mx-auto gap-4 items-center justify-between px-4 ">
                        <div className="grid sm:grid-cols-2 gap-4 rounded-md ">
                            <div className="stat place-items-center bg-accent bg-opacity-30 shadow">
                                <div className="stat-title">
                                    <FaUsers className="inline-block mr-2" /> Total Users
                                </div>
                                <div className="stat-value">{stats.totalUsers}</div>
                                <div className="stat-desc">Overall user count in the system</div>
                            </div>

                            <div className="stat place-items-center bg-accent bg-opacity-30 shadow">
                                <div className="stat-title">
                                    <FaChalkboardTeacher className="inline-block mr-2" /> Total Classes
                                </div>
                                <div className="stat-value">{stats.totalClasses}</div>
                                <div className="stat-desc">Classes added from the teacher dashboard</div>
                            </div>

                            <div className="stat place-items-center bg-accent bg-opacity-30 shadow">
                                <div className="stat-title">
                                    <FaGraduationCap className="inline-block mr-2" /> Total Enrollments
                                </div>
                                <div className="stat-value">{stats.totalEnrollments}</div>
                                <div className="stat-desc">Total enrollment count in the system</div>
                            </div>

                            <div className="stat place-items-center bg-accent bg-opacity-30 shadow">
                                <div className="stat-title">
                                    <FaDollarSign className="inline-block mr-2" /> Total Revenue
                                </div>
                                <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
                                <div className="stat-desc">Total payments received</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <CourseSalesChart />
        </div>
    );
};

export default Analytics;
