import React from "react";
import Authentication from "../Component/Authentication";
import AdminRoute from "./Admin";
import AdminLayout from "../Component/Layouts/AdminLayout";
const PrivateRoute = (props) => {
  return (
    <Authentication>
      <AdminLayout location={props.location}>
        <AdminRoute />
      </AdminLayout>
    </Authentication>
  );
};

export default PrivateRoute;
