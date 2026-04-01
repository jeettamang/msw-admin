import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/ApiRoutes";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    instructors: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const coursesRes = await axios.get(`${baseUrl}/course/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const usersRes = await axios.get(`${baseUrl}/users/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const instructorsRes = await axios.get(`${baseUrl}/instructor/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats({
        courses: coursesRes.data.course?.length || coursesRes.data.length || 0,
        students: usersRes.data.users?.length || usersRes.data.length || 0,
        instructors:
          instructorsRes.data.instructors?.length ||
          instructorsRes.data.length ||
          0,
      });
    } catch (error) {
      console.log(
        "Error fetching stats:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsArray = [
    { title: "Total Courses", value: stats.courses },
    { title: "Total Students", value: stats.students },
    { title: "Total Instructors", value: stats.instructors },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Admin Dashboard</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsArray.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
