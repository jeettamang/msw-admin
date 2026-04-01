import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../config/ApiRoutes";

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);

  const fetchInstructor = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("No token found");

      const res = await axios.get(`${baseUrl}/instructor/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInstructors(res.data.instructors || res.data);

      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    fetchInstructor();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Instructor Management</h3>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Instructor
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left w-1/5">Name</th>
              <th className="py-3 px-4 text-left w-1/4">Email</th>
              <th className="py-3 px-4 text-left w-2/5">Bio</th>
              <th className="py-3 px-4 text-left w-1/5">Action</th>
            </tr>
          </thead>

          <tbody>
            {instructors.map((ins) => (
              <tr key={ins._id} className="border-t">
                <td className="py-3 px-4">{ins.name}</td>
                <td className="py-3 px-4">{ins.email}</td>
                <td className="py-3 px-4">{ins.bio}</td>

                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>

                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorManagement;
