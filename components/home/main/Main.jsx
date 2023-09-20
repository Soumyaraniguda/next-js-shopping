import MainSwiper from "./Swiper";
import styles from "./page.module.scss";

import React from "react";

function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>

      <div className={styles.menu}>Menu</div>

      <MainSwiper />

      <div className={styles.offers}>offers</div>
      <div className={styles.user}>user</div>
    </div>
  );
}

export default Main;
