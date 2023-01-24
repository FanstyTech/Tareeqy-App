import { Typography } from "@mui/material";
import React from "react";
interface SectionProps {
  title?: String;
  children?: any;
  otherProps?: any;
  customClass?: any;
}
const Section: React.FC<SectionProps> = ({
  children,
  title,
  otherProps,
  customClass,
}) => {
  return (
    <div className={`mb-5 ${customClass}`} {...otherProps}>
      {title && (
        <Typography component="div" variant="h6" className="page-heading mb-5">
          <span>{title}</span>
        </Typography>
      )}

      {children}
    </div>
  );
};

export default Section;
