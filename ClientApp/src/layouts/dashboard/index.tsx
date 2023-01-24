import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import ProductHomePage from "../../components/Product/Pages/Visitor/index";
import Footer from "./footer/footer";
import { connect } from "react-redux";
import { logout } from "../../store/actions/user";
import { MHidden } from "../../components/@material-extend";
import SearchBar from "../../components/Main/searchBar";
import AdminDashboard from "../../components/Product/Pages/admin";
import { Route, useHistory } from "react-router";

interface DashboardLayoutProps {
  user: any;
  logout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const APP_BAR_MOBILE = 50;
  const APP_BAR_DESKTOP = 70;
  const [DRAWER_WIDTH, setDRAWER_WIDTH] = useState(0);

  const RootStyle = styled("div")(({ theme }) => ({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: DRAWER_WIDTH,
    },
  }));

  const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: APP_BAR_MOBILE + 10,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
      paddingTop: APP_BAR_DESKTOP + 10,
    },
  }));
  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname.toLowerCase() == "/admin-dashboard") {
        setDRAWER_WIDTH(220);
      }
      console.log(`You changed the page to: ${location.pathname}`);
    });
  }, [history]);
  return (
    <RootStyle className="bg-gray">
      <DashboardNavbar
        user={user}
        logout={logout}
        onOpenSidebar={() => setOpen(true)}
        DRAWER_WIDTH={DRAWER_WIDTH}
      />

      <Route
        path="/admin-dashboard"
        render={(props) => (
          <DashboardSidebar
            user={user}
            isOpenSidebar={open}
            onCloseSidebar={() => setOpen(false)}
          />
        )}
      />

      <MHidden width="lgUp">
        <DashboardSidebar
          user={user}
          isOpenSidebar={open}
          onCloseSidebar={() => setOpen(false)}
        />
      </MHidden>

      <MainStyle>
        <Stack spacing={3.5} className=" ">
          <Route
            path="/admin-dashboard"
            render={(props) => <AdminDashboard />}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <>
                {" "}
                <SearchBar />
                <ProductHomePage />
              </>
            )}
          />
        </Stack>
      </MainStyle>
      <Footer />
    </RootStyle>
  );
};
const mapStateToProps = (state: any) => ({
  // user: state.user.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
