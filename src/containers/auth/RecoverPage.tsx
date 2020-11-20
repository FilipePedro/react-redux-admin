import React, { useState } from 'react'

// material UI imports
import { makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TelegramIcon from '@material-ui/icons/Telegram';
import Alert from '@material-ui/lab/Alert';
import CustomForm from '../../components/common/Form';

// common imports
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
  }
}));

const Recover = () => {
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
      text: 'Recover'
    },
    {
      type: 'navlink',
      link: '/login',
      text: '< Back',
      styles: {
        textAlign: 'end'
      }
    },
  ]

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TelegramIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recover
        </Typography>
        <Typography variant="overline" gutterBottom>
          A recovery email will be sent
        </Typography>
        {
          alert
            ? <Alert variant="standard" severity="warning" style={{ marginTop: 10 }}>
              Under construction
            </Alert>
            : <></>
        }
        <CustomForm
          fields={['email']}
          submitAction={handleSaveAction}
          loading={loading}
          buttons={buttons}
        />
      </div>
    </Container>
  );
};

export default Recover;
