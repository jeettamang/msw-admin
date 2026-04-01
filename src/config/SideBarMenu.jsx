import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  User,
  GraduationCap,
} from "lucide-react";

export const AdminMenu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    name: "Payment History",
    path: "/admin/funds",
    icon: CreditCard,
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: User,
  },
  {
    name: "Students",
    path: "/admin/students",
    icon: User,
  },
  {
    name: "Instructor",
    path: "/admin/instructors",
    icon: GraduationCap,
  },
];
