import Ad from "./Ad";
import Main from "./Main";
import Top from "./Top";
import styles from "./page.module.scss";

function Header({ browserLocation }) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top browserLocation={browserLocation} />
      <Main />
    </header>
  );
}

export default Header;
