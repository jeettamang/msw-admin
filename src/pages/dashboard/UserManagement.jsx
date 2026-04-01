import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../config/ApiRoutes";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data.users || res.data);

      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Student Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left w-1/5">Name</th>
              <th className="py-3 px-4 text-left w-1/4">Email</th>
              <th className="py-3 px-4 text-left w-2/5">Profile</th>
              <th className="py-3 px-4 text-left w-1/5">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <img className="w-24" src={user.profile} alt={user.name} />
                </td>

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

export default UserManagement;
