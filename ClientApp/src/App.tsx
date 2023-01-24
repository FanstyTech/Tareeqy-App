import React from "react";
import { Provider } from "react-redux";
import "./i18nextConf";
import * as ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Store from "./store";
import "./global.scss";
import "antd/dist/antd.min.css";
import Main from "./pages/Main";
import Login from "./pages/user/Login";
import { getLanguage } from "./utils";

// Toggle style based on language
const lang = getLanguage();
window.document.body.style.direction = lang === "NA" ? "rtl" : "ltr";
import ThemeConfig from "./theme";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import CreateAccount from "./pages/user/createAccount";

const App: React.FC<{}> = () => {
  return (
    <ThemeConfig>
      <Provider store={Store}>
        <ConfigProvider>
          <SnackbarProvider maxSnack={3}>
            <BrowserRouter basename="/">
              <Switch>
                <Route path="/login" render={(props) => <Login />} />
                <Route
                  path="/CreateAccount"
                  render={(props) => <CreateAccount />}
                />
                <Route path="/" render={(props) => <Main />} />
                {/* <Dashboard /> */}
              </Switch>
            </BrowserRouter>
          </SnackbarProvider>
        </ConfigProvider>
      </Provider>
    </ThemeConfig>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
