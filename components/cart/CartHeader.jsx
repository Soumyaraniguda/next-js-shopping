import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import { MdPlayArrow } from "react-icons/md";

function CartHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/">
            <Image src="/images/logo.png" width={100} height={28} alt="" />
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link href="/browse">
            Continue Shopping <MdPlayArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartHeader;
