import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import auth from '../../services/authService';

interface PrivateRouteProps {
  children: React.ReactChild,
  path: string,
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => (auth.getLocalAuthByKey('user') ? (
      children
    ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
  />
);

export default PrivateRoute;
