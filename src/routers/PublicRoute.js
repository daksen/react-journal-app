import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';


export const PlubicRoute = ({
  isLoggedIn,
  component: Component,
  ...rest
}) => {
  
  return (
    <Route { ... rest }
      component={(props) => (
        (isLoggedIn)
          ? <Redirect to="/" />
          : <Component { ...props } />
      )}
    />
  );
}

PlubicRoute.protoTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}