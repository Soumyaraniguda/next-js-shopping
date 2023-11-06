"use client";

import AdminSidenav from "@/components/admin/sidenav/AdminSidenav";
import styles from "@/styles/adminDashboard.module.scss";
import { useSelector } from "react-redux";

function AdminLayout({ children }) {
  const { adminSideNavExpand } = useSelector((state) => ({ ...state }));
  const showSideNav = adminSideNavExpand?.expand;

  return (
    <div className={styles.layout}>
      <AdminSidenav />
      <div
        style={{ marginLeft: `${showSideNav ? "280px" : "80px"}` }}
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
