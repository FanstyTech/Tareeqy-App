import { Box } from "@mui/material";
import moment from "moment";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box className="bg-white py-3">
      <h6 style={{ textAlign: "center" }}>&copy; {moment().year()}</h6>
    </Box>
  );
};

export default Footer;
