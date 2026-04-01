import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/course/get-all`);
      setCourses(res.data.course);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Course
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`${baseUrl}/course/delete/${id}`);
      getCourses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>

        <button
          onClick={() => navigate("/admin/courses/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">SN</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Instructor</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr key={course._id} className="border-t">
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{course.title}</td>
                  <td className="p-3">Rs. {course.price}</td>
                  <td className="p-3">{course.duration}</td>
                  <td className="p-3">{course.instructor}</td>

                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/courses/edit/${course._id}`)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManagement;
