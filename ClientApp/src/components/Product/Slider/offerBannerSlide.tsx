import { Box } from "@mui/system";
import React, { useState } from "react";
import SwiperCore, { Navigation, Autoplay, Virtual, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Section from "../../Main/Section";
import BannerItemCard from "../Banner/bannerItemCard";

const OfferBannerSlide: React.FC = () => {
  var baseUrl =
    "https://cdn11.bigcommerce.com/s-70vl7164h7/product_images/uploaded_images/offer-img-";
  const [lst, setLst] = useState([
    {
      imgUrl: baseUrl + "01.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
    {
      imgUrl: baseUrl + "02.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
    {
      imgUrl: baseUrl + "03.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
    {
      imgUrl: baseUrl + "04.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
    {
      imgUrl: baseUrl + "05.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
    {
      imgUrl: baseUrl + "06.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
    {
      imgUrl: baseUrl + "07.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
    {
      imgUrl: baseUrl + "08.jpg",
      title: "Smart Phones",
      subtitle: "Up To 30% OFF",
    },
  ]);
  return (
    <Section>
      <Box className="bg-gray p-3  ">
        <Swiper
          className="hide-pagination-swiper custom-swiper"
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2000,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          //modules={[Pagination]}
        >
          {lst.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <BannerItemCard item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Section>
  );
};

export default OfferBannerSlide;
