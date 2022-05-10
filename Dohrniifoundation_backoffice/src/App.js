import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { publicRoutes as routes, adminRoute as admin } from "./Route/Route";
import PublicRoute from "./Route/PublicRoute";
import history from "./Utility/history";
import PrivateRoute from "./Route/PrivateRoute";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReduxBlockUi from 'react-block-ui/redux'; // only for redux
// import reduxMiddleware from 'react-block-ui/reduxMiddleware'; // only for redux
import "react-block-ui/style.css";

const App = () => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route component={PrivateRoute} path={admin.DASHBOARD} />
          <Route component={PublicRoute} path={routes.LANDING} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit="1"
      />
    </>
  );
};

export default App;
