// import Image from "next/image";

// export default function Slide(props) {
//   return (
//     <>
//       {" "}
//       <div className="outline-none border-none relative">
//         <Image
//           className="w-[100%] h-[384px] md:h-auto rounded-xl object-cover object-right md:object-left-bottom"
//           src={props.img}
//           alt="banner"
//           width={2000}
//           height={2000}
//         />
//       </div>
//     </>
//   );
// }
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
      {/* {slides.map((slide) => (
        <SwiperSlide key={slide.image}>
          <img src={slide.image} alt={slide.title} />
        </SwiperSlide>
      ))} */}
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
