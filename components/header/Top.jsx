"use-client";

import styles from "./page.module.scss";
import Image from "next/image";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

function Top({ browserLocation }) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image
              alt="Country flag"
              src={browserLocation?.flag || "/images/user-avatar.svg"}
              height={20}
              width={20}
              className="object-contain"
            />
            <span>{browserLocation?.country}</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <ul>
              {session ? (
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <Image
                      alt="User profile pic"
                      src={session?.user?.image || "/images/user-avatar.svg"}
                      height={20}
                      width={20}
                      className="object-contain"
                    />
                    <span>{session?.user.name}</span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
              ) : (
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <RiAccountPinCircleLine />
                    <span>Account</span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
              )}
            </ul>

            {showMenu && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Top;
