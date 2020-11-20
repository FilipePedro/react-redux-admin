/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material UI imports
import { makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

// common imports
import CustomForm from '../../components/common/Form';
import { IState } from '../../types';
import { loginUser } from '../../state/auth/authActions';
import { LoginParams } from '../../state/auth/types';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loader: {
    margin: theme.spacing(2, 'auto'), // '8px auto'
  },
}));

const SignIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loginError] = useState({ message: '' });
  const dispatch = useDispatch();
  const loading = useSelector((state: IState) => state.apiCallsInProgress > 0);

  const handleSaveAction = async (data: LoginParams) => {
    try {
      console.log('onSubmit: ', data);
      await dispatch(loginUser(data));
      history.push('/');
    } catch ({ message }) {
      // handleLoginError({ message });
      console.log(`onSubmit error: ${message}`);
    }
  }

  const buttons = [
    {
      type: 'submit',
      text: 'Sign In'
    },
    {
      type: 'navlink',
      link: '/recover',
      text: 'Forgot Password?'
    },
    {
      type: 'navlink',
      link: '/register',
      text: 'No account? Sign Up',
      styles: {
        textAlign: 'end'
      }
    }
  ]

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {
          loginError?.message
            ? <Alert variant="standard" severity="error" style={{ marginTop: 10 }}>
              {loginError.message}
            </Alert>
            : <></>
        }
        <Typography variant="caption" gutterBottom>
          <strong>Hint:</strong> demo@teste.com/123456
        </Typography>
        <CustomForm
          fields={['email', 'password', 'remember']}
          submitAction={handleSaveAction}
          loading={loading}
          buttons={buttons}
        />
      </div>
    </Container>
  );
};

export default SignIn;
