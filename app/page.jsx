"use client";

import styles from "../styles/page.module.scss";
import { useDispatch } from "react-redux";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main/Main";
import FlashDeals from "@/components/home/flashDeals/FlashDeals";
import Categories from "@/components/home/categories/Categories";
import ProductSwiper from "@/components/productsSwiper/ProductSwiper";
import { gamingSwiper, homeImprovSwiper, women_swiper } from "@/data/home";
import ProductCard from "@/components/productCard/ProductCard";
import { useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [products, setProducts] = useState();

  const [browserLocation, setBrowserLocation] = useState({});

  const { adminSideNavExpand } = useSelector((state) => ({ ...state }));
  const showSideNav = adminSideNavExpand?.expand;

  console.log({ showSideNav, adminSideNavExpand });

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

  useEffect(() => {
    axios.get("/api/product").then((response) => {
      setProducts(response.data?.products);
    });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <Categories />
          <ProductSwiper products={women_swiper} />
          {/* <ProductSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="#2f82ff"
          />
          <ProductSwiper
            products={homeImprovSwiper}
            header="Home Decor"
            bg="#ed4337"
          /> */}
          <div className={styles.products}>
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
