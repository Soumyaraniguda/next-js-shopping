"use client";

import styles from "../styles/page.module.scss";
import { addItem, reset } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

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
    <div className={styles.red}>
      {session ? (
        "You are logged in"
      ) : (
        <>
          <span>You are not logged in</span>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
      {/* Welcome
      <button style={{ cursor: "pointer" }} onClick={addItemToCart}>
        Add Item
      </button>
      <button onClick={resetCart}>Reset </button> */}
    </div>
  );
}
