"use client";

import { toggleSideNav } from "@/redux/adminSideNavExpandSlice";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  MdArrowForwardIos,
  MdLogout,
  MdNotifications,
  MdOutlineCategory,
  MdSpaceDashboard,
} from "react-icons/md";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcSalesPerformance } from "react-icons/fc";
import { IoListCircleSharp, IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineLogout, HiUsers } from "react-icons/hi";
import { BiCategory, BiMessageDetail } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { RiCoupon3Line, RiPlayListAddLine } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";

function AdminSidenav() {
  const pathName = usePathname();
  const activeRoute = pathName.split("/admin/dashboard/")[1];
  console.log(activeRoute);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { adminSideNavExpand } = useSelector((state) => ({ ...state }));
  const sideNavExpanded = adminSideNavExpand?.expand;

  const handleToggleExpand = () => {
    dispatch(toggleSideNav());
  };

  return (
    <div
      className={`${styles.sideNav} ${sideNavExpanded ? styles.expanded : ""}`}
    >
      <div
        className={styles.sideNav__toggle}
        onClick={() => handleToggleExpand()}
      >
        <div
          style={{
            transform: `${sideNavExpanded ? "rotate(180deg)" : ""}`,
            transition: "all 0.2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>

      <div className={styles.sideNav__container}>
        <div className={styles.sideNav__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={styles.sideNav__user}>
          {session && session.user && (
            <>
              <Image src={session.user.image} alt="" height={60} width={60} />
              <div className={styles.show_expanded}>
                <span>Welcome back 👋</span>
                <span>{session.user.name}</span>
              </div>
            </>
          )}
        </div>

        <ul className={styles.sideNav__list}>
          <li className={activeRoute === undefined ? styles.active : ""}>
            <Link href="/admin/dashboard">
              <MdSpaceDashboard />
              <span className={styles.show_expanded}>Dashboard</span>
            </Link>
          </li>
          <li className={activeRoute === "sales" ? styles.active : ""}>
            <Link href="/admin/dashboard/sales">
              <FcSalesPerformance />
              <span className={styles.show_expanded}>Sales</span>
            </Link>
          </li>
          <li className={activeRoute === "orders" ? styles.active : ""}>
            <Link href="/admin/dashboard/orders">
              <IoListCircleSharp />
              <span className={styles.show_expanded}>Orders</span>
            </Link>
          </li>
          <li className={activeRoute === "users" ? styles.active : ""}>
            <Link href="/admin/dashboard/users">
              <HiUsers />
              <span className={styles.show_expanded}>Users</span>
            </Link>
          </li>
          <li className={activeRoute === "messages" ? styles.active : ""}>
            <Link href="/admin/dashboard/messages">
              <BiMessageDetail />
              <span className={styles.show_expanded}>Messages</span>
            </Link>
          </li>
        </ul>
        {/* Product */}
        <div className={styles.sideNav__dropdown}>
          <div className={styles.sideNav__dropdown_heading}>
            <div className={styles.show_expanded}>Product</div>
          </div>
          <ul className={styles.sideNav__list}>
            <li className={activeRoute === "product/all" ? styles.active : ""}>
              <Link href="/admin/dashboard/product/all">
                <BsListTask />
                <span className={styles.show_expanded}>All Products</span>
              </Link>
            </li>
            <li
              className={activeRoute === "product/create" ? styles.active : ""}
            >
              <Link href="/admin/dashboard/product/create">
                <RiPlayListAddLine />
                <span className={styles.show_expanded}>Create Product</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Categories */}
        <div className={styles.sideNav__dropdown}>
          <div className={styles.sideNav__dropdown_heading}>
            <div className={styles.show_expanded}>Categories / Sub</div>
          </div>
          <ul className={styles.sideNav__list}>
            <li className={activeRoute === "categories" ? styles.active : ""}>
              <Link href="/admin/dashboard/categories">
                <BiCategory />
                <span className={styles.show_expanded}>Categories</span>
              </Link>
            </li>
            <li
              className={activeRoute === "sub-categories" ? styles.active : ""}
            >
              <Link href="/admin/dashboard/sub-categories">
                <MdOutlineCategory />
                <span className={styles.show_expanded}>Sub-Categories</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Coupons */}
        <div className={styles.sideNav__dropdown}>
          <div className={styles.sideNav__dropdown_heading}>
            <div className={styles.show_expanded}>Coupons</div>
          </div>
          <ul className={styles.sideNav__list}>
            <li className={activeRoute === "coupons" ? styles.active : ""}>
              <Link href="/admin/dashboard/coupons">
                <RiCoupon3Line />
                <span className={styles.show_expanded}>Coupons</span>
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <ul
            className={`${styles.sideNav__list} ${
              sideNavExpanded ? styles.nav_flex : ""
            }`}
          >
            <li>
              <Link href="">
                <IoSettingsOutline />
              </Link>
            </li>
            <li>
              <Link href="">
                <IoMdNotificationsOutline />
              </Link>
            </li>
            <li>
              <Link href="">
                <BiMessageDetail />
              </Link>
            </li>
            <li>
              <Link href="">
                <MdLogout />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminSidenav;
