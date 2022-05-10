import React from "react";
import { Route } from "react-router-dom";

import { agentRoute } from "./Route";
import AgentDashboard from "../Pages/Agent/index";

const AgentRoute = (props) => {
  return (
    <>
      <Route exact path={agentRoute.DASHBOARD} component={AgentDashboard} />
    </>
  );
};

export default AgentRoute;
