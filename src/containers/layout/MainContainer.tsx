import React, { useState } from 'react';
import clsx from 'clsx';
import { Route, Switch } from 'react-router-dom';

// material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// common imports
// import CreatePage from '../pages/CreatePage';
// import EditPage from '../pages/EditPage';
import Header from '../../components/navigation/Header';
import Drawer from '../../components/navigation/Drawer';
import UsersPage from '../users/UsersPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

  const [openNavbar, setNavbar] = useState(true);

  return (
    <div className={classes.root}>
      <Header open={openNavbar} handleNavbar={setNavbar} />
      <Drawer open={openNavbar} handleNavbar={setNavbar} />

      <Box className={clsx(classes.mainContainer, {
        [classes.mainContainerShift]: openNavbar,
      })}>
        <Switch>
          <Route exact path="/" component={UsersPage} />
          {/*  <Route path="/create" component={CreatePage} />
          <Route exact path="/edit" component={EditPage} />
          <Route path="/edit/:id" component={EditPage} /> */}
        </Switch>
      </Box>
    </div>
  );
};

export default MainContainer;
