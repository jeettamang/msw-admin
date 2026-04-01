import {
  Home,
  Users,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="bg-gray-50 w-64 shadow min-h-screen">
      <div className="flex flex-col gap-2">
        <NavLink>
          <LayoutDashboard />
          Dashboard
        </NavLink>
        <NavLink>
          <Users />
          Users
        </NavLink>
        <NavLink>
          <BookOpen />
          Courses
        </NavLink>
        <NavLink>
          <GraduationCap />
          Instructor
        </NavLink>
        <NavLink>
          <Home />
          Go home
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSideBar;
