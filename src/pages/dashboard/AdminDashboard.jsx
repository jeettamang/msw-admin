import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/ApiRoutes";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    instructors: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [coursesRes, usersRes, instructorsRes] = await Promise.all([
        axios.get(`${baseUrl}/course/get-all`, config),
        axios.get(`${baseUrl}/users/get-all`, config),
        axios.get(`${baseUrl}/instructor/get-all`, config),
      ]);

      setStats({
        courses: coursesRes.data.course?.length || coursesRes.data.length || 0,
        students: usersRes.data.users?.length || usersRes.data.length || 0,
        instructors:
          instructorsRes.data.instructors?.length ||
          instructorsRes.data.length ||
          0,
      });
    } catch (error) {
      console.error(
        "Error fetching stats:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsArray = [
    { title: "Total Courses", value: stats.courses, color: "text-blue-600" },
    { title: "Total Students", value: stats.students, color: "text-green-600" },
    {
      title: "Total Instructors",
      value: stats.instructors,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Admin Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsArray.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">
              {stat.title}
            </p>
            <h3 className={`text-3xl font-extrabold mt-2 ${stat.color}`}>
              {loading ? "..." : stat.value}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
