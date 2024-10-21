import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Slider = ({ slides }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="/images/hiro1.png" alt="tes" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/hiro1.png" alt="tes" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/hiro1.png" alt="tes" />
      </SwiperSlide>
    </Swiper>
  );
};
