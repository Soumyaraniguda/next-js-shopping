"use client";

import AdminSidenav from "@/components/admin/sidenav/AdminSidenav";
import styles from "@/styles/adminDashboard.module.scss";
import { toast } from "react-toastify";

function AdminDashboard() {
  return (
    <div
      className={styles.header}
      onClick={() => toast.success("Everything is okay")}
    >
      Dashboard
    </div>
  );
}

export default AdminDashboard;
