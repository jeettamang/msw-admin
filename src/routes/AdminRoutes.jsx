import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import CourseManagement from "../pages/dashboard/CourseManagement";
import InstructorManagement from "../pages/dashboard/InstructorManagement";
import UserManagement from "../pages/dashboard/UserManagement";
import AdminLayout from "../layout/AdminLayout";

const AdminRoutes = () => {
  return (
    <>
      <AdminRoutes />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route
            path="instructor-management"
            element={<InstructorManagement />}
          />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
