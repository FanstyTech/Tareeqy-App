import PropTypes from "prop-types";
// material
import { createTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
// ----------------------------------------------------------------------

MHidden.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOf([
    "xsDown",
    "smDown",
    "mdDown",
    "lgDown",
    "xlDown",
    "xsUp",
    "smUp",
    "mdUp",
    "lgUp",
    "xlUp",
  ]).isRequired,
};
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
export default function MHidden({ width, children }) {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery(() => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery(() => theme.breakpoints.down(breakpoint));

  if (width.includes("Down")) {
    return hiddenDown ? null : children;
  }

  if (width.includes("Up")) {
    return hiddenUp ? null : children;
  }

  return null;
}
