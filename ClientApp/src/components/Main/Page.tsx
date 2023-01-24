import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// material
import { Box, Typography } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

const Page: React.FC<PageProps> = ({ children, title, otherProps }) => {
  return (
    <Box {...otherProps}>
      {/* <Helmet>
      </Helmet> */}

      {children}
    </Box>
  );
};

export interface PageProps {
  children?: any;
  otherProps?: any;
  title?: any;
}

export default Page;
