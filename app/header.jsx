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
  );
}
