import styled from "@emotion/styled";
import React, { FC } from "react";
import SwiperCore, { Navigation, Autoplay, Virtual, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

const SliderImgStyle = styled("img")({
  top: 0,
  width: "100% !important",
  height: "100% !important",
  objectFit: "cover",
  position: "absolute",
});
const BoxStyle = styled("div")({
  // pt: "50%",
  position: "relative",
  height: "25rem",
});

const HeroCarouselSlide: React.FC = () => {
  const slides = [];

  for (let i = 0; i < 3; i++) {
    slides.push();
  }
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 5000,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        className="mySwiper"
      >
        <SwiperSlide style={{ listStyle: "none" }}>
          <BoxStyle>
            <SliderImgStyle
              alt={"cover"}
              src={
                "https://cdn11.bigcommerce.com/s-70vl7164h7/images/stencil/original/carousel/3/home-slider-01.jpg?c=1"
              }
            />
          </BoxStyle>
        </SwiperSlide>

        <SwiperSlide style={{ listStyle: "none" }}>
          <BoxStyle>
            <SliderImgStyle
              alt={"cover"}
              src={
                "https://cdn11.bigcommerce.com/s-70vl7164h7/images/stencil/original/carousel/4/home-slider-02.jpg?c=1"
              }
            />
          </BoxStyle>
        </SwiperSlide>
        <SwiperSlide style={{ listStyle: "none" }}>
          <BoxStyle>
            <SliderImgStyle
              alt={"cover"}
              src={
                "https://cdn11.bigcommerce.com/s-70vl7164h7/images/stencil/original/carousel/9/home-slider-04.jpg?c=1"
              }
            />
          </BoxStyle>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroCarouselSlide;
