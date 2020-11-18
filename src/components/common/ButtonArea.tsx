import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  CircularProgress
} from '@material-ui/core';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  loader: {
    margin: theme.spacing(2, 'auto'), // '8px auto'
  },
}));

const ButtonArea = (props: any) => {
  const classes = useStyles();
  const { buttons, loading, isDirty } = props;
  return !loading ? (
    <>
      { buttons.map((b: any, i: number) => {
        switch (b.type) {
          case 'submit':
            return (
              <Grid item xs={12} key={i}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!isDirty}
                  className={classes.submit}
                >
                  {b.text}
                </Button>
              </Grid>
            )
          case 'navlink':
            return (
              <Grid item xs key={i} style={b.styles}>
                <NavLink to={b.link}>
                  {b.text}
                </NavLink>
              </Grid>
            )
          default:
            return true
        }
      })}
    </>
  ) : (
      <Grid container justify="center" spacing={2}>
        <Grid item className={classes.loader}>
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
    )
};

export default ButtonArea;