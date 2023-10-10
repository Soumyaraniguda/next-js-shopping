import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";

function SearchBar() {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <span className={styles.logo}>
            <Image alt="logo" src="/images/logo.png" width={100} height={28} />
          </span>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link href="/cart">
          <span className={styles.cart}>
            <FaOpencart />
            <span>{cart?.cartItems?.length || 0}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
