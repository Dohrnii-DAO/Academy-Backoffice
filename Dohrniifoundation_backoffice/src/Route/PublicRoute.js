import React from "react";
import { Route, Switch } from "react-router-dom";
import { publicRoutes } from "./Route";
import PublicLayout from "../Component/Layouts/PublicLayout";
import Login from "../Pages/Public/Login";
import Forgotpassword from "../Pages/Public/ForgotPassword";
import ResetPassword from "../Pages/Public/ResetPassword";
import Page404 from "../Pages/Public/Page404";

// import AppleLink from "../Pages/Public/Link/Apple";

const PublicRoute = (props) => {
  return (
    <>
      <PublicLayout location={props.location}>
        <Switch>
          <Route exact path={publicRoutes.LANDING} component={Login} />
          <Route
            exact
            path={publicRoutes.FORGOT_PASSWORD}
            component={Forgotpassword}
          />
          {/* <Route exact path={publicRoutes.APPLE} component={AppleLink} /> */}

          <Route
            exact
            path={publicRoutes.RESET_PASSWORD}
            component={ResetPassword}
          />
          <Route path="/" component={Page404} />
        </Switch>
      </PublicLayout>
    </>
  );
};

export default PublicRoute;
