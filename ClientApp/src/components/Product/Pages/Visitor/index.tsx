import { Grid, Stack } from "@mui/material";
import React from "react";
import OfferBannerSlide from "../../Slider/offerBannerSlide";
import Hero from "../../Hero/index";
import Section from "../../../Main/Section";
import { CardList } from "../../../Card";
const Index: React.FC = () => {
  const pro = [
    {
      price: 400,
      name: "We Can Be Heroes",
      cover:
        "https://img.freepik.com/free-photo/podium-display-with-product-presentation-3d-rendering_41470-3668.jpg?w=900&t=st=1668089117~exp=1668089717~hmac=67deb86800f44c97d144ab2794b3338cbb7b29a05c5dcfc292ca5c16a0cf93ed",
    },

    {
      price: 400,
      name: "Sonic the Hedgehog",
      cover:
        "https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40282.jpg?t=st=1668089109~exp=1668089709~hmac=9abf6bf661cc6125e45c457ab9555b4aa65db77d5012d457bad4e0026e636ac6",
    },
    {
      price: 400,
      name: "We Can Be Heroes",
      cover:
        "https://img.freepik.com/free-psd/foundation-mock-up-product_23-2149738372.jpg?w=1060&t=st=1668089180~exp=1668089780~hmac=f11080f995b1b867b8b27827729e576dad162dde41322ed85e87f296ee2230e5",
    },

    {
      price: 400,
      name: "Sonic the Hedgehog",
      cover:
        "https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40284.jpg?w=900&t=st=1668090373~exp=1668090973~hmac=6dcdaa16069d8f6ff4cb2df9f25fcc9b9619523ece09d6c5684f79e7d3c87d6e",
    },
    {
      price: 400,
      name: "We Can Be Heroes",
      cover:
        "https://img.freepik.com/free-photo/podium-display-with-product-presentation-3d-rendering_41470-3668.jpg?w=900&t=st=1668089117~exp=1668089717~hmac=67deb86800f44c97d144ab2794b3338cbb7b29a05c5dcfc292ca5c16a0cf93ed",
    },

    {
      price: 400,
      name: "Sonic the Hedgehog",
      cover:
        "https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40282.jpg?t=st=1668089109~exp=1668089709~hmac=9abf6bf661cc6125e45c457ab9555b4aa65db77d5012d457bad4e0026e636ac6",
    },
  ];
  return (
    <>
      <div className="bg-white p-5 mt-3 ">
        <Hero></Hero>
        <OfferBannerSlide />

        <Section>
          <Grid container spacing={3}>
            {[1, 2, 3].map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} className="adv-banner-item">
                  <div className="border-radius adv-banner-sub-item ">
                    <img
                      className="w-100 h-100"
                      src={`https://cdn11.bigcommerce.com/s-70vl7164h7/product_images/uploaded_images/sub-banner-0${item}.jpg`}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>{" "}
        </Section>
        <Section title="Shop Categories">
          <CardList products={pro} />
        </Section>
      </div>
    </>
  );
};
export default Index;
