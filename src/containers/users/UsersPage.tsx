import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import DataTable from '../../components/common/DataTable/DataTable';
import { IState } from '../../types';
import { fetchUsers, generateRandom, deleteUser } from '../../state/users/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
  },
  paper: {
    paddingTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const UsersPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state: IState) => state.users);
  const loading = useSelector((state: IState) => state.apiCallsInProgress > 0);

  const loadUsers = useCallback(
    () => {
      console.log('loaders...');
      dispatch(fetchUsers())
    },
    [dispatch]
  )

  const handleDeleteUser = (selected: number[]) => dispatch(deleteUser(selected));
  const handleGenerateRandom = (n: number) => dispatch(generateRandom(n));


  useEffect(() => {
    if (users.length === 0) loadUsers();
  }, [users, loadUsers]);

  interface IHeadCells {
    id: string;
    numeric: boolean;
    avatar?: boolean;
    disablePadding: boolean;
    label: string;
  }

  const headCells: IHeadCells[] = [
    {
      id: 'avatar',
      numeric: false,
      avatar: true,
      disablePadding: false,
      label: 'Photo',
    },
    {
      id: 'fullName',
      numeric: false,
      disablePadding: true,
      label: 'Full Name',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
    },
    {
      id: 'gender',
      numeric: false,
      disablePadding: true,
      label: 'Gender',
    },
    {
      id: 'age',
      numeric: true,
      disablePadding: false,
      label: 'Age',
    },
    {
      id: 'nat',
      numeric: true,
      disablePadding: false,
      label: 'Nationality',
    },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: false,
      label: 'Created At',
    },
  ];

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs>
            <DataTable
              rows={users}
              headerCells={headCells}
              deleteAction={handleDeleteUser}
              generateRandom={handleGenerateRandom}
              loading={loading}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default UsersPage;

