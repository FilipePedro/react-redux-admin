import React, { SyntheticEvent } from 'react';

import { Avatar, Snackbar, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


interface SnackBarProps {
  reset: any,
  alert: {
    openSnackBar: boolean,
    type?: "success" | "info" | "warning" | "error" | undefined,
    message?: string,
    avatar?: string,
    time?: number
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  snackAvatar: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  // alert: {
  //   backgroundColor: theme.palette.background.paper,
  // }
}));

const Alert: React.FC<AlertProps> = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />

const SnackBar: React.FC<SnackBarProps> = ({ alert, reset }: SnackBarProps) => {
  const classes = useStyles();
  const {
    openSnackBar,
    type,
    message,
    avatar,
    time = 3000
  } = alert;

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    reset(); // reset alert to hide snackbar
  };

  return (
    <Snackbar open={openSnackBar} autoHideDuration={time} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        // className={classes.alert}
        icon={avatar ? <></> : null}
      >
        {avatar ? <Avatar alt="Remy Sharp" src={avatar} className={classes.snackAvatar} /> : null}
        <Typography component="span" variant="inherit" style={{ marginLeft: 10 }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  )
};

export default SnackBar;