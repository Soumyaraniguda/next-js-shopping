import Image from "next/image";
import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

function EmptyCart() {
  const { data: session } = useSession();

  return (
    <div className={styles.empty}>
      <Image src="/images/empty.png" height="100" width="100" alt="" />
      <h1>Cart is empty</h1>
      {!session ? (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          SIGN IN / REGISTER
        </button>
      ) : (
        <></>
      )}
      <Link href="/browse">
        <button
          className={`${styles.empty__btn} ${styles.empty__btn_shop_now}`}
        >
          SHOP NOW
        </button>
      </Link>
    </div>
  );
}

export default EmptyCart;
