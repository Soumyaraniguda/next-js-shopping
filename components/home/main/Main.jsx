import Header from "./Header";
import Menu from "./Menu";
import Offers from "./Offers";
import MainSwiper from "./Swiper";
import User from "./User";
import styles from "./page.module.scss";

import React from "react";

function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}

export default Main;
