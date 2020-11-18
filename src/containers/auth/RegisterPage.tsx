import React, { useState } from 'react';

// material UI imports
import { makeStyles } from '@material-ui/core/styles';
import { Container, Avatar, Typography } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Alert } from '@material-ui/lab';

// common imports
import CustomForm from '../../components/common/Form';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

const SignUp = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleSaveAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      setAlert(true)
    }, 2000);
  };

  const buttons = [
    {
      type: 'submit',
      text: 'Sign Up'
    },
    {
      type: 'navlink',
      link: '/login',
      text: 'Already have an account? Sign in',
      styles: {
        textAlign: 'end'
      }
    },
  ]

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MeetingRoomIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {
          alert
            ? <Alert variant="standard" severity="warning" style={{ marginTop: 10 }}>
              Under construction
            </Alert>
            : <></>
        }
        <CustomForm
          fields={['email', 'password']}
          submitAction={handleSaveAction}
          loading={loading}
          buttons={buttons}
        />
      </div>
    </Container>
  );
};

export default SignUp;
