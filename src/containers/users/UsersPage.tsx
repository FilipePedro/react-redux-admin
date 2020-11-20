import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material UI imports
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

// commom imports
import CustomFab from '../../components/common/CustomFab';
import DataTable from '../../components/common/DataTable/DataTable';
import { IState } from '../../types';
import { fetchUsers, generateRandom, deleteUser } from '../../state/users/userActions';
import { headCells } from '../../utils/users-utils';

const useStyles = makeStyles((theme: Theme) => ({
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
  mainContainer: {
    background: theme.palette.grey[100],
  },
}));

interface UsersPageProps {
  children?: React.ReactNode,
  handleAlerts: (alert: any) => void,
}

const UsersPage: React.FC<UsersPageProps> = (props: UsersPageProps) => {
  const { handleAlerts } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state: IState) => state.users);
  const loading = useSelector((state: IState) => state.apiCallsInProgress > 0);

  const loadUsers = useCallback(async () => {
    try {
      await dispatch(fetchUsers())
    } catch (error) {
      handleAlerts({
        openSnackBar: true,
        type: 'warning',
        message: 'Error loading users. Please refresh page.',
      });
    }
  },
    [dispatch, handleAlerts]
  )

  useEffect(() => {
    if (users.length === 0) loadUsers();
  }, [users, loadUsers]);

  const handleDeleteUser = async (selected: number[]) => {
    await dispatch(deleteUser(selected))
    handleAlerts({
      openSnackBar: true,
      type: 'success',
      message: `User${selected.length > 1 ? 's' : ''} deleted with success.`
    });
  };

  const handleGenerateRandom = async (n: number) => {
    try {
      await dispatch(generateRandom(n));
      handleAlerts({
        openSnackBar: true,
        type: 'success',
        message: `${n} Users generated with success.`,
        time: 2000
      });
    } catch (error) {
      handleAlerts({
        openSnackBar: true,
        type: 'warning',
        message: 'Error generating users. Please try again.',
        time: 2000
      });
    }
  };

  const fabActions = [
    { icon: <GroupAddIcon />, name: 'GenerateUsers', tooltip: 'Generates 10 new random Users', onClick: handleGenerateRandom },
  ];

  return (
    <Container component="main" className={classes.mainContainer}>
      <div className={classes.paper}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs>
            <DataTable
              rows={users}
              headerCells={headCells}
              deleteAction={handleDeleteUser}
              loading={loading}
            />
          </Grid>
        </Grid>
        <CustomFab actions={fabActions} />
      </div>
    </Container>
  );
};

export default UsersPage;

