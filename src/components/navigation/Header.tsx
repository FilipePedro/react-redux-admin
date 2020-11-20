import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// material UI imports
import { makeStyles, Theme } from '@material-ui/core/styles';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip
} from '@material-ui/core';

import { logoutUser } from '../../state/auth/authActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface HeaderProps {
  open: boolean;
  handleNavbar: (b: boolean) => void;
}
// eslint-disable-next-line no-shadow
const Header: React.FC<HeaderProps> = ({ open, handleNavbar }: HeaderProps) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    handleNavbar(true);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Redux Application
          </Typography>
          <Tooltip title="Logout" placement="bottom">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;