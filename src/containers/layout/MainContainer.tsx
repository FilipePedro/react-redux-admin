import React, { useState } from 'react';
import clsx from 'clsx';
import { Route, Switch } from 'react-router-dom';

// material UI imports
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// common imports
// import EditPage from '../pages/EditPage';
import Header from '../../components/navigation/Header';
import Drawer from '../../components/navigation/Drawer';
import UsersPage from '../users/UsersPage';
import CreatePage from '../users/CreatePage';
import SnackBar from '../../components/common/Snackbar';
import EditPage from '../users/EditPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.grey[100],
    height: '100vh',
  },
  mainContainerShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const MainContainer: React.FC = () => {
  const classes = useStyles();

  interface alertState {
    show: boolean,
    type?: "success" | "info" | "warning" | "error" | undefined,
    message?: string,
  }

  const [openNavbar, setNavbar] = useState(true);
  const [alert, setAlert] = useState<alertState | any>({})

  // reset fn to pass to snackbar component
  const resetAlert = () => setAlert({});

  return (
    <div className={classes.root}>
      <Header open={openNavbar} handleNavbar={setNavbar} />
      <Drawer open={openNavbar} handleNavbar={setNavbar} />

      <Box className={clsx(classes.mainContainer, {
        [classes.mainContainerShift]: openNavbar,
      })}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <UsersPage {...props} handleAlerts={setAlert} />
            )}
          />
          <Route
            exact
            path="/create"
            render={(props) => (
              <CreatePage {...props} handleAlerts={setAlert} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(props) => (
              <EditPage {...props} handleAlerts={setAlert} />
            )}
          />
          <Route
            exact
            path="/edit/:id"
            render={(props) => (
              <EditPage {...props} handleAlerts={setAlert} />
            )}
          />
        </Switch>
      </Box>
      { Object.keys(alert).length > 0 ? <SnackBar alert={alert} reset={resetAlert} /> : <></>}
    </div>
  );
};

export default MainContainer;
