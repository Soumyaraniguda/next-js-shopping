"use client";

import styles from "../styles/page.module.scss";
import { addItem, reset } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main/Main";

export default function Home() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  console.log({ session });

  const [browserLocation, setBrowserLocation] = useState({});

  const addItemToCart = () => {
    dispatch(addItem());
  };

  const resetCart = () => {
    dispatch(reset());
  };

  useEffect(() => {
    // axios.get("/api/browser-location").then((response) => {
    // setBrowserLocation({
    //   country: response.data.name,
    //   flag: response.data.flag.emojitwo,
    // });
    setBrowserLocation({
      country: "India",
      flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg",
    });
    // });
  }, []);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
    </>
  );
}
