import React from "react";
import Header from "../Header";
const AdminLayout = (props) => {
  return (
    <>
      <Header dashboardback={props.location.pathname} HomeBackInside={true} />
      <div className="main-wrapper">{props.children}</div>
    </>
  );
};

export default AdminLayout;
