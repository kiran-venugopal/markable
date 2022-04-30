import React from "react";

// @ts-expect-error ts-migrate(2305) FIXME: Module '"react-router-dom"' has no exported member... Remove this comment to see the full error message
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'Component' implicitly has an 'any... Remove this comment to see the full error message
  component: Component,
  isAuthenticated = true,
  unAuthorizedOnly = false,
  authorizedOnly = false,
  redirectPath = "/",
  ...rest
}) => {
  function renderComponent(props: any) {
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


  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ render: (props: any) => Element; }' is not... Remove this comment to see the full error message
  return <Route {...rest} render={renderComponent} />;
};

export default GuardedRoute;
