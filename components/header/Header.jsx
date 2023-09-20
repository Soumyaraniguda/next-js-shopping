import Ad from "./Ad";
import SearchBar from "./SearchBar";
import Top from "./Top";
import styles from "./page.module.scss";

function Header({ browserLocation }) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top browserLocation={browserLocation} />
      <SearchBar />
    </header>
  );
}

export default Header;
