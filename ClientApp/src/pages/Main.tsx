import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getLanguage } from "../utils";
import { useTranslation } from "react-i18next";
import SpinnerComp from "../components/Spinner";

import Dashboard from "../layouts/dashboard";

// const OpenIssuseFeatures = React.lazy(
//     () => import("../features/OpenLawCaseFeature")
// );
// const IssuseQueryFeature = React.lazy(
//     () => import("../features/IssuesQueryFeature")
// );

// const ViewLawCaseFeature= React.lazy(
//     () => import("../features/ViewLawCaseFeature")
// );

interface MainProps {
  user: any;
  request: number;
  isLoginNow: boolean;
  loadingUser: boolean;
}

const Main: React.FC<MainProps> = ({
  user,
  request,
  isLoginNow,
  loadingUser,
}) => {
  const loadingCondition = loadingUser || true;
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      const url = localStorage.getItem("returnURL") || "/";
      history.push(url);
    } else {
      //history.push("/login");
      history.push("/");
    }
  }, [user]);

  const returnURL = window.location.pathname || "";
  if (!returnURL.includes("/login") && !returnURL.includes("/logout")) {
    localStorage.setItem("returnURL", returnURL);
  }
  const returnApp = (
    <>
      {/* {loadingCondition && <SpinnerComp />} */}

      <Dashboard user={user} />
      {/* <ChatIndex /> */}
    </>
  );

  return returnApp;
};

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  request: state.user.request_id,
  isLoginNow: state.user.isLoginNow,
  loadingUser: state.user.loading,
});

export default connect(mapStateToProps, null)(Main);
