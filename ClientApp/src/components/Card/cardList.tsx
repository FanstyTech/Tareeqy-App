import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import React from "react";
import ShopProductCard from "./ProductCard";

// ----------------------------------------------------------------------

CardList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function CardList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={2}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
