import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Icon } from "@iconify/react";
// utils
//

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
const CardStyle = styled(Card)(({ theme }) => ({
  borderRadius: 2,
  boxShadow: "0 0 2px 0 #919eab36, 0 10px 20px -4px #919eab4d",
}));

export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <CardStyle>
      <Card className="produt-item ">
        <Box sx={{ pt: "86%", position: "relative" }}>
          <img alt={name} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }} className="text-center">
          <Rating
            readOnly
            size="small"
            className="justify-content-center "
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <div>
            {" "}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {price}$
            </Typography>
          </div>
        </Stack>

        <div className="product-item-figcaption">
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 2.5 }}
          >
            {/* <LanguagePopover /> */}
            {/* <NotificationsPopover /> */}

            <Icon icon="ant-design:heart-outlined" width={22} height={22} />
            <div className="overly-line"></div>
            <Icon icon="ic:baseline-remove-red-eye" width={22} height={22} />
          </Stack>
        </div>
        <div className="product-item-figcaption2"></div>
      </Card>
    </CardStyle>
  );
}
