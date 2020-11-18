import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import MainContainer from '../layout/MainContainer';
import PrivateRoute from '../../components/auth/PrivateRoute';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import RecoverPage from '../auth/RecoverPage';

const App = () => (
  <>
    <CssBaseline />
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/recover" component={RecoverPage} />
      <PrivateRoute path="/">
        <MainContainer />
      </PrivateRoute>
    </Switch>
  </>
);

export default App;
