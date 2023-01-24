import { Icon } from "@iconify/react";
import shoppingCartFill from "@iconify/icons-eva/shopping-cart-fill";
// material
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow:
    "0 0 2px 0 rgb(145 158 171 / 24%), 0 20px 40px -4px rgb(145 158 171 / 24%)",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  return (
    <RootStyle>
      <Badge showZero badgeContent={0} color="error" max={99}>
        <Icon icon={shoppingCartFill} width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}
