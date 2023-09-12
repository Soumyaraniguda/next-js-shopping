import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";

function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shop and Pay!</h4>
      {session ? (
        <div className={styles.flex}>
          <Image
            width={28}
            height={28}
            alt="User profile pic"
            src={session?.user?.image || "/images/user-avatar.svg"}
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session?.user?.name}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
