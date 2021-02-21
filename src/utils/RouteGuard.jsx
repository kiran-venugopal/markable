import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({
  component: Component,
  auth = true,
  onlyUnauthorized = false,
  ...rest
}) => {
  function renderComponent(props) {
    console.log({ rest });
    if (!auth && rest.location.pathname !== "/") {
      console.log({ rest });
      localStorage.setItem("fromUrl", rest.location.pathname);
    }

    if (auth === true) {
      if (onlyUnauthorized === true && rest.path !== "/login") {
        return <Redirect to="/login" />;
      } else return <Component {...props} />;
    } else return <Redirect to="/login" />;
  }

  return <Route {...rest} render={renderComponent} />;
};

export default GuardedRoute;
