import React from "react";
import styles from "./page.module.scss";
import FooterLinks from "./FooterLinks";
import Socials from "./Socials";
import NewsLetter from "./NewsLetter";
import Payment from "./Payment";
import Copyright from "./Copyright";

function Footer({ browserLocation }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <FooterLinks />
        <Socials />
        <NewsLetter />
        <Payment />
        <Copyright browserLocation={browserLocation} />
      </div>
    </footer>
  );
}

export default Footer;
