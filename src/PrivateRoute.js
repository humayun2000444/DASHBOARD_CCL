import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const token = JSON.parse(localStorage.getItem("userInfo"));
  console.log(token.roles);
  return (
    <Route
      {...rest}
      render={(props) =>
        role ? (
          // Check if the user role matches the required role
          role[0].name === "ROLE_ADMIN" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/a" />
          )
        ) : (
          // No role restriction
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
