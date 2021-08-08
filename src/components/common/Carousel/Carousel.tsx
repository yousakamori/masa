import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFlip } from "swiper";

const images = [
  { title: "first", src: "/images/First-Comment.png" },
  { title: "guaaaaaa", src: "/images/Guaaaaaa.png" },
];

SwiperCore.use([Autoplay, EffectFlip]);

export const Carousel = () => {
  const [toggleColor, setToggleColor] = useState("bg-teal-50");
  return (
    <>
      <Swiper
        autoplay
        spaceBetween={50}
        slidesPerView={1}
        effect={"flip"}
        onAutoplay={() =>
          setToggleColor((prev) =>
            prev === "bg-teal-50" ? "bg-red-50" : "bg-teal-50"
          )
        }
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide
              className={`flex justify-center py-12 ${toggleColor}`}
              key={index}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={300}
                height={200}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
