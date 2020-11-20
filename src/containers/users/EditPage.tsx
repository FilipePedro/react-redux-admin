import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

// materil UI imports
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  Avatar,
  Divider,
  CardContent
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SaveIcon from '@material-ui/icons/Save';

// common imports
import { editUser } from '../../state/users/userActions';
import { IUser, IState } from '../../types';
import avatar from '../../assets/images/avatar.png';
import CustomForm from '../../components/common/Form';
import { findCountryByLabel } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    minWidth: 345,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

interface CreatePageProps {
  children?: React.ReactNode,
  handleAlerts: (alert: any) => void,
}

const EditPage: React.FC<CreatePageProps> = ({ handleAlerts }: CreatePageProps) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state: IState) => state.apiCallsInProgress > 0);
  const { id } = useParams<any>();
  const user = useSelector((state: IState) => state.users.filter((u) => u.id === parseInt(id, 10))[0]);

  const handleSaveAction = async (data: IUser) => {

    const newData = typeof data.country === 'string'
      ? { ...data, country: findCountryByLabel(data.country) }
      : { ...data };

    await dispatch(editUser({ user, data: newData }));
    history.push('/');
    handleAlerts({
      openSnackBar: true,
      type: 'success',
      message: 'User edited with success.',
      avatar: imgSrc,
    });
  };

  const handleBackAction = (event: SyntheticEvent) => {
    event.preventDefault();
    history.goBack();
  };

  const imgSrc = user?.picture?.large || avatar;


  const buttons = [
    {
      type: 'submit',
      text: 'Save',
      icon: <SaveIcon />

    },
    {
      type: 'btn',
      text: 'Back',
      icon: <ChevronLeftIcon />,
      onClick: (event: SyntheticEvent) => handleBackAction(event)
    }
  ]

  return (
    <>
      { !user
        ? (<Redirect to='/' />)
        : (
          <Container component="main">
            <div className={classes.paper}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} xl={6} md={6} lg={5}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar alt={'new_user'} src={imgSrc} className={classes.large} />
                      }
                      title={`${user ? 'Edit' : 'Add'} User`}
                    />
                    <Divider />
                    <CardContent>
                      <CustomForm
                        data={user}
                        fields={['fullName', 'email', 'gender', 'age', 'country']}
                        submitAction={handleSaveAction}
                        loading={loading}
                        buttons={buttons}
                      />
                    </CardContent>
                  </Card >
                </Grid>
              </Grid>
            </div>
          </Container>)
      }
    </>
  );
};

export default EditPage;