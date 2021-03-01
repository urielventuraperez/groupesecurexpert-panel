import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoutes = ({ component, isLogged, ...rest }) => {
  let Component = component;

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

const mapStateToProps = state => {
  return {
    isLogged: state.auth.idLogged
  };
};

export default withRouter(connect(mapStateToProps)(ProtectedRoutes));
