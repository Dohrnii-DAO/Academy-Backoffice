import React from "react";
import { publicRoutes as Routes } from "../Route/Route";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Authentication = (props) => {
  const token = cookies.get("accessToken");

  if (token) {
    return props.children;
  }

  return <Redirect to={Routes.LANDING} />;
};

export default Authentication;
