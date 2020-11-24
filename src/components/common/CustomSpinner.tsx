import React from 'react';
import { makeStyles, Theme, Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    margin: theme.spacing(2, 'auto'), // '8px auto'
  },
}));

interface SpinnerProps {
  size?: string
}

const CustomSpinner = (props: SpinnerProps) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item className={classes.loader}>
        <CircularProgress color="secondary" {...props} />
      </Grid>
    </Grid>
  )
}

export default CustomSpinner;