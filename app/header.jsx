"use client";
import styles from "./page.module.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Header() {
  return (
    <div className="mx-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={true}
        loop={true}
      >
        <SwiperSlide className={styles.mySwiperSlide}>
          <img src="/images/hiro1.png" alt="tes" className={styles.myImage} />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <img src="/images/hiro2.png" alt="tes" className={styles.myImage} />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <img src="/images/hiro3.png" alt="tes" className={styles.myImage} />
        </SwiperSlide>
      </Swiper>
    </div>

    // <
    //   className="hero h-96 bg-hero-pattern bg-contain bg-no-repeat"
    //   style={{ backgroundImage: "url('/images/tes.png')" }}
    // >
    /* <div className="hero-content  flex-col lg:flex-row-reverse">
        <img
          src="/images/hiro.png"
          className="max-w-sm rounded-lg h-[350px] w-auto"
          alt="Album"
        />
        <div>
          <h1 className="text-5xl font-bold text-slate-200">Al Hikmah</h1>
          <p className="py-6 text-slate-300">
            Halo Sobat Al Hikmah, Disini kami menyediakan berbagai macam buku.
            Sobat bisa membeli dan memesan buku dengan mudah dan buku akan tiba
            di rumah.
          </p>
          <button className="btn flex bg-red-500 hover:bg-red-600 border-none  text-white">
            <FaShop className="text-lg" />
            Beli Sekarang
          </button>
        </div>
      </div> */
  );
}
