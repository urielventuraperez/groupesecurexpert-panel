import React from "react";
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoutes = ({ component, isLogged, ...rest }) => {
  let Component = component;
  
  return (
    <Route
      {...rest}
      render={props =>
        isLogged === true ? (
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

ProtectedRoutes.propTypes = {
  isLogged: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export default withRouter(connect(mapStateToProps)(ProtectedRoutes));
