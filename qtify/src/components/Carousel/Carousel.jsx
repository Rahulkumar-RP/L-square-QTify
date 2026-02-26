import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./Carousel.module.css";

function LeftArrow({ onClick }) {
  return (
    <button className={styles.navBtn} onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function RightArrow({ onClick }) {
  return (
    <button className={styles.navBtn} onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function Carousel({ children }) {
  const swiperRef = useRef(null);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <div className={styles.navBtnWrapper}>
          <LeftArrow onClick={() => swiperRef.current?.slidePrev()} />
        </div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={16}
          breakpoints={{
            0:    { slidesPerView: 2, spaceBetween: 10 },
            480:  { slidesPerView: 3, spaceBetween: 12 },
            768:  { slidesPerView: 4, spaceBetween: 14 },
            1024: { slidesPerView: 5, spaceBetween: 16 },
            1280: { slidesPerView: 7, spaceBetween: 16 },
            1800: { slidesPerView: 8, spaceBetween: 16 },
          }}
          className={styles.swiper}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.navBtnWrapper}>
          <RightArrow onClick={() => swiperRef.current?.slideNext()} />
        </div>
      </div>
    </div>
  );
}

export default Carousel;