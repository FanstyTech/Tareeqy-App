import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "../../layouts/AuthLayout";
// components
import Page from "../../components/Main/Page";
import { MHidden } from "../../components/@material-extend";
import { LoginForm } from "../../components/authentication/login";
import AuthSocial from "../../components/authentication/AuthSocial";
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";

import Illustration_login from "../../assets/img/illustration_login.png";
import SpinnerComp from "../../components/Spinner";
import { login } from "../../store/actions/user";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
  boxShadow: "0 0 2px 0 #919eab36, 0 20px 40px -4px #919eab4d",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

interface LoginProps {
  login: (obj: any) => void;
  loading: boolean;
  isLoginNow: boolean;
  error: String;
}
const Login: React.FC<LoginProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { login, loading, isLoginNow, error } = props;

  useEffect(() => {
    // enqueueSnackbar("This is a error message!", {
    //   variant: "error",
    // });

    if (loading == false && error?.length > 0) {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  }, [error]);
  const history = useHistory();
  useEffect(() => {
    if (isLoginNow) {
      history.push("/");
    }
  }, [isLoginNow]);

  return (
    <>
      {loading && <SpinnerComp />}
      <RootStyle title="Login">
        <div className="d-flex">
          <AuthLayout>
            Don’t have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to="/CreateAccount"
            >
              Get started
            </Link>
          </AuthLayout>

          <MHidden width="mdDown">
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <img src={Illustration_login} alt="login" />
            </SectionStyle>
          </MHidden>

          <Container maxWidth="sm">
            <ContentStyle>
              {/* <AuthSocial /> */}

              <LoginForm login={login} />
              {/* 
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login With Google"
              onSuccess={(googleData) => {
                console.log("onSuccess", googleData);
              }}
              onFailure={(result) => {
                console.log("onFailure", result);
              }}
              cookiePolicy="single_host_origin"
            /> */}
              <MHidden width="smUp">
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?&nbsp;
                  <Link
                    variant="subtitle2"
                    component={RouterLink}
                    to="register"
                  >
                    Get started
                  </Link>
                </Typography>
              </MHidden>
            </ContentStyle>
          </Container>
        </div>
      </RootStyle>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.user.loading,
  isLoginNow: state.user.isLoginNow,
  error: state.user.error,
});
const mapDispatchToProps = (dispatch: any) => ({
  login: (obj: any) => dispatch(login(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
