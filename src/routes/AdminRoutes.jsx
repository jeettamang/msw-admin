import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import CourseManagement from "../pages/dashboard/CourseManagement";
import UserManagement from "../pages/dashboard/UserManagement";
import AdminLayout from "../layout/AdminLayout";
import FundHistory from "../pages/dashboard/FundHistory";
import Profile from "../pages/dashboard/Profile";
import InstructorManagement from "../pages/dashboard/InstructorManagement";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="instructors" element={<InstructorManagement />} />
          <Route path="students" element={<UserManagement />} />
          <Route path="funds" element={<FundHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
