import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, Box, styled } from "@mui/system";
import React, { useRef, useState } from "react";
import MenuPopover from "./menuPopover";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import { Icon } from "@iconify/react";
import InputBase from "@mui/material/InputBase";
import Marquee from "react-fast-marquee";
import Card from "../../theme/overrides/Card";

const MENU_OPTIONS = [
  {
    label: "Shop All",
    linkTo: "/",
  },
  {
    label: "3D Games Parts",
    linkTo: "#",
  },
  {
    label: "Camera & Photo",
    linkTo: "#",
  },
  {
    label: "Garden",
    linkTo: "#",
  },
  {
    label: "Shop All",
    linkTo: "/",
  },
  {
    label: "3D Games Parts",
    linkTo: "#",
  },
  {
    label: "Camera & Photo",
    linkTo: "#",
  },
  {
    label: "Garden",
    linkTo: "#",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
  },
  display: "flex",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "95%",
    height: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "100%",
    },
  },
}));

const SearchBar = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* px-5 py-3 */}
      <Grid container className="px-5 py-3  search-bar ">
        <Grid item xs={12} sm={12} md={2}>
          <Button
            className="border-radius"
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                },
              }),
            }}
            startIcon={<Icon icon={menu2Fill} />}
          >
            shop by categories
          </Button>

          <MenuPopover
            open={open}
            hasArrowButton={false}
            onClose={handleClose}
            anchorEl={anchorRef.current}
            sx={{ width: "50%", padding: 2 }}
            className="categories-menu"
            elevation={2}
          >
            <Grid container spacing={3} style={{ width: "100%" }}>
              <Grid item xs={12} sm={12} md={6}>
                {MENU_OPTIONS.map((option) => (
                  <MenuItem className="p-2">
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                      }}
                    >
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div className="img-container">
                  {" "}
                  <img
                    className="p-5"
                    src="https://cdn11.bigcommerce.com/s-70vl7164h7/images/stencil/368x239/uploaded_images/blog-03.jpg?t=1601022294"
                  />{" "}
                </div>
              </Grid>
            </Grid>
          </MenuPopover>
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <Search>
            <SearchIconWrapper>
              <Icon icon="ic:baseline-search" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Button
            className="border-radius"
            sx={{
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                },
              }),
            }}
          >
            <Marquee
              style={{ backgroundColor: "none !important" }}
              className="px-2"
            >
              I can be a React component, multiple React components, or just
              some text.
            </Marquee>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default SearchBar;
