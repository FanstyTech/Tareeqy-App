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

import Illustration_register from "../../assets/img/illustration_register.png";
import SpinnerComp from "../../components/Spinner";
import { CreateAccountAsync, login } from "../../store/actions/user";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { RegisterForm } from "../../components/authentication/register";
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

interface CreateAccountProps {
  CreateAccountAsync: (obj: any) => void;
  loading: boolean;
  isLoginNow: boolean;
  error: String;
  successEmail: String;
}
const CreateAccount: React.FC<CreateAccountProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { CreateAccountAsync, loading, isLoginNow, error, successEmail } =
    props;

  useEffect(() => {
    if (loading == false && error?.length > 0) {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  }, [error]);

  const history = useHistory();
  useEffect(() => {
    if (loading == false && successEmail?.length > 0) {
      enqueueSnackbar(successEmail, {
        variant: "success",
      });

      // history.push("/Login");
    }
  }, [successEmail]);
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
            Already have an account? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to="/Login"
            >
              Login
            </Link>
          </AuthLayout>

          <MHidden width="mdDown">
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Join Us
              </Typography>
              <img src={Illustration_register} alt="login" />
            </SectionStyle>
          </MHidden>

          <Container maxWidth="sm">
            <ContentStyle>
              {/* <AuthSocial /> */}

              <RegisterForm CreateAccountAsync={CreateAccountAsync} />

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
  successEmail: state.user.success_email,
  error: state.user.error,
});
const mapDispatchToProps = (dispatch: any) => ({
  CreateAccountAsync: (obj: any) => dispatch(CreateAccountAsync(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
