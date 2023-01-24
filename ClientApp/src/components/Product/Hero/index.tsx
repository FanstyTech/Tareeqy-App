import { Grid } from "@mui/material";
import React from "react";
import Section from "../../Main/Section";
import HeroCarouselSlide from "../Slider/heroCarouselSlide";

const Index: React.FC = () => {
  return (
    <>
      {" "}
      <Section>
        <Grid container spacing={3} className="top-banner">
          <Grid item xs={12} sm={6} md={8}>
            <HeroCarouselSlide />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={6} className="adv-banner-item">
                    <div className="border-radius adv-banner-sub-item ">
                      <img
                        src={`https://cdn11.bigcommerce.com/s-70vl7164h7/product_images/uploaded_images/top-banner-0${item}.jpg`}
                      />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>{" "}
      </Section>
    </>
  );
};
export default Index;
