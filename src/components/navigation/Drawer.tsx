import React, { useState, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';

// material UI imports
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.grey[800],
  },
}));

interface LeftDrawerProps {
  open: boolean,
  handleNavbar: (b: boolean) => void,
}

// eslint-disable-next-line no-shadow
const LeftDrawer = ({ open, handleNavbar }: LeftDrawerProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerClose = () => {
    handleNavbar(false);
  };

  const activeStyle = {
    color: theme.palette.secondary.light,
    '& > *': {
      color: theme.palette.secondary.light,
    },
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: SyntheticEvent, index: number) => setSelectedIndex(index);

  const handleDisabledClick = (event: SyntheticEvent, isDisabled: boolean) => {
    if (isDisabled) event.preventDefault();
  };

  const routes = [
    {
      path: '/',
      exact: true,
      label: 'List',
      icon: <ListIcon />,
    },
    {
      path: '/create',
      label: 'Create',
      icon: <AddIcon />,
    },
    {
      path: '/edit',
      label: 'Edit',
      disabled: true,
      icon: <EditIcon />,
    },
  ];

  return (
    <nav className={classes.root} aria-label="list create users">
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Users
            </ListSubheader>
          }
          disablePadding>
          {routes.map((r, index) => (
            <NavLink
              onClick={(event) => {
                const t = r.disabled || false
                handleDisabledClick(event, t)
              }}
              className={classes.links}
              key={r.label}
              to={r.path}
              exact={r.exact}
              activeStyle={activeStyle}
            >
              <ListItem
                button
                disabled={r.disabled}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemIcon>{r.icon}</ListItemIcon>
                <ListItemText primary={r.label} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
      </Drawer>
    </nav>
  );
};

export default LeftDrawer;