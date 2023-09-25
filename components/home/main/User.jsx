import Image from "next/image";
import styles from "./page.module.scss";
import "../../../styles/swiper.scss";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Navigation } from "swiper/modules";
import { userSwiperArray } from "@/data/home";

function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <Image
        src="/images/user-header.jpg"
        alt="User background"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <Image
              src={session?.user?.image}
              alt="User image"
              width={50}
              height={50}
            />
            <h4>{session?.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <Image
              src={"/images/user-avatar.svg"}
              alt="User image"
              width={50}
              height={50}
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="">
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="">
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="">
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="">
              <BsHeart />
            </Link>
          </li>
        </ul>

        <div className={styles.user__swiper}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              width: "180px !important",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item) => (
              <SwiperSlide key={item.image}>
                <Link href="">
                  <img src={item.image} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Image
        src="/images/user-header.jpg"
        alt="User background"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className={styles.user__footer}
      />
    </div>
  );
}

export default User;
