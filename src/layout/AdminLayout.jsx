import React from "react";
import AdminSideBar from "../components/AdminSideBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <div>
      <AdminSideBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
