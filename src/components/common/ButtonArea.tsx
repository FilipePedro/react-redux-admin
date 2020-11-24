import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Button,
} from '@material-ui/core';

import { NavLink } from 'react-router-dom';
import CustomSpinner from './CustomSpinner';

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(2, 0, 2),
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
                  startIcon={b.icon}
                >
                  {b.text}
                </Button>
              </Grid>
            )
          case 'btn':
            return (
              <Grid item xs={12} key={i}>
                <Button
                  onClick={b.onClick}
                  startIcon={b.icon}
                >
                  Back
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
  ) : (<CustomSpinner />)
};

export default ButtonArea;