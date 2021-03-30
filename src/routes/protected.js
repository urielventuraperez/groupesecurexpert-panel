import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { LSTOKEN } from 'src/utils/environmets';

const ProtectedRoutes = ({ component, ...rest }) => {
  let Component = component;
  let isLogged = localStorage.getItem(LSTOKEN);
  
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default withRouter(ProtectedRoutes);
