import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({
  component: Component,
  isAuthenticated = true,
  unAuthorizedOnly = false,
  authorizedOnly = false,
  redirectPath = "/",
  ...rest
}) => {
  function renderComponent(props) {
    if (isAuthenticated) {
      if (unAuthorizedOnly) return <Redirect to={redirectPath} />;
      return <Component {...props} />;
    } else if (authorizedOnly)
      return (
        <Redirect
          to={`${redirectPath}${
            rest.location.pathname.includes("ref") &&
            !rest.location.pathname.includes(rest.path)
              ? ""
              : `?ref=${rest.location.pathname}`
          }`}
        />
      );

    return <Component {...props} />;
  }

  return <Route {...rest} render={renderComponent} />;
};

export default GuardedRoute;
