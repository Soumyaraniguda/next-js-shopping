import Link from "next/link";
import styles from "./page.module.scss";

const Ad = () => {
  return (
    <Link href="/browse">
      <div className={styles.ad}></div>
    </Link>
  );
};

export default Ad;
