import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { createMuiTheme, CssBaseline, ThemeOptions } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
// import shape from "./shape";
// import palette from "./palette";
// import typography from "./typography";
import componentsOverride from "./overrides";
// import shadows, { customShadows } from "./shadows";
import React from "react";

// ----------------------------------------------------------------------
export type PaletteMode = "light" | "dark";

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default function ThemeConfig({ children }) {
  // const themeOptions = useMemo(
  //   () => ({
  //     palette,
  //     shape,
  //     typography,
  //      shadows,
  //       customShadows,
  //   }),
  //   []
  // );

  const themeOptions = {};

  const theme = createTheme(themeOptions);
  // theme.components = componentsOverride(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
