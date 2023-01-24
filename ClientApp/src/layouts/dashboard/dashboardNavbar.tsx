import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
// components
import { MHidden } from "../../components/@material-extend";
//
// import Searchbar from "./Searchbar";
import AccountPopover from "./accountPopover";
// import LanguagePopover from "./LanguagePopover";
import NotificationsPopover from "./NotificationsPopover";
import React from "react";

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 50;
const APPBAR_DESKTOP = 70;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100%)`,
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  color: "black",
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------
interface DashboardNavbarPrpos {
  onOpenSidebar: any;
  logout: any;
  user: any;
  DRAWER_WIDTH: any;
}

const DashboardNavbar: React.FC<DashboardNavbarPrpos> = ({
  onOpenSidebar,
  logout,
  user,
  DRAWER_WIDTH,
}) => {
  return (
    <RootStyle className="border-bottom-gray-50">
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <MHidden width="lgDown">
          <Stack
            direction="row"
            alignItems="center"
            style={{ marginLeft: DRAWER_WIDTH }}
            spacing={2.5}
          >
            <Typography sx={{ minWidth: 100 }}>Contact</Typography>
            <Typography sx={{ minWidth: 100 }}>Plant Care</Typography>
            <Typography sx={{ minWidth: 100 }}>Workshops</Typography>
            <Typography sx={{ minWidth: 100 }}>Blogs</Typography>
          </Stack>
        </MHidden>

        {/* <Searchbar /> */}
        {/* <Box sx={{ flexGrow: 1 }}></Box> */}

        <Stack
          direction="row"
          alignItems="center"
          style={{ marginLeft: "auto" }}
          spacing={{ xs: 0.5, sm: 2.5 }}
        >
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}

          <Icon icon="akar-icons:shopping-bag" width={22} height={22} />
          <Icon icon="ant-design:heart-outlined" width={22} height={22} />
          <AccountPopover user={user} logout={logout} />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
