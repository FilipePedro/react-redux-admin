import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material UI imports
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

// commom imports
import CustomFab from '../../components/common/CustomFab';
import SmallCard from '../../components/common/SmallCard';
import DataTable from '../../components/common/DataTable/DataTable';
import { IState } from '../../types';
import { fetchUsers, generateRandom, deleteUser } from '../../state/users/userActions';
import { headCells } from '../../utils/users-utils';
import TestingChart from '../../components/common/Charts/TestingChart';

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
  spaceTop: {
    paddingTop: theme.spacing(5),
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

  const calcGenderPer = () => {
    const total = users.length;
    const male = users.filter((u) => u.gender === 'male').length
    const female = users.filter((u) => u.gender === 'female').length
    return {
      male,
      female,
      malePer: (male / total * 100).toFixed(2),
      femalePer: (female / total * 100).toFixed(2)
    }
  }

  const calcAgeAverage = () => {
    const total = users.length;
    const averageTotal = (users.reduce((acc, u) => {
      return acc + parseInt(u.age, 0);
    }, 0) / total).toFixed(0);

    // average male age
    const maleUsers = users.filter((u) => u.gender === 'male')
    const maleTotal = maleUsers.length;
    const averageMale = (maleUsers.reduce((acc, u) => {
      return acc + parseInt(u.age, 0);
    }, 0) / maleTotal).toFixed(0);

    // average female age
    const femaleUsers = users.filter((u) => u.gender === 'female')
    const femaleTotal = femaleUsers.length;
    const averageFemale = (femaleUsers.reduce((acc, u) => {
      return acc + parseInt(u.age, 0);
    }, 0) / femaleTotal).toFixed(0);

    return {
      averageTotal,
      averageMale,
      averageFemale,
    };
  }

  const calcCountryRep = () => {
    const u = users.reduce((acc: any, c: any) => {
      const alreadyExists = acc.filter((a: any) => a.value === c.country.value)[0];
      if (alreadyExists) {
        const newAcc = acc.filter((a: any) => a.value !== c.country.value);
        const t = {
          ...alreadyExists,
          count: alreadyExists['count'] + 1
        }
        return [...newAcc, t];
      }
      return [
        ...acc,
        {
          country: c.country.label,
          value: c.country.value,
          count: 1,
        }
      ]
    }, []);

    const max = u.reduce((acc, current) => {
      if (acc[0].count > current.count) return [...acc];
      if (acc[0].count === current.count) return [...acc, current];
      return [current];
    }, [{ count: 0 }]);

    const calcMinValue = u.reduce((prev, current) => prev.count < current.count ? prev : current, 0).count;
    const min = u.reduce((acc, current) => {
      if (acc[0].count === current.count) return [...acc, current];
      if (acc[0].count > current.count) return [current];
      return [...acc]
    }, [{ count: calcMinValue }]).filter((v: any) => v.country);

    return {
      max,
      min,
    }
  }

  const sideCards = [
    {
      title: 'Gender %',
      types: 'genderPer',
      data: calcGenderPer(),
    },
    {
      title: 'Age',
      types: 'averageAge',
      data: calcAgeAverage(),
    },
    {
      title: 'Country Representation',
      types: 'countryRep',
      data: calcCountryRep(),
    }
  ]

  const fabActions = [
    { icon: <GroupAddIcon />, name: 'GenerateUsers', tooltip: 'Generates 10 new random Users', onClick: handleGenerateRandom },
  ];

  return (
    <Container component="main" className={classes.mainContainer}>
      <Grid container className={classes.spaceTop} spacing={2}>
        <Grid item xs={12} md={9}>
          <TestingChart data={users} loading={loading} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container>
            {
              sideCards.map((s, i) =>
                (
                  <Grid item xs={12} sm={4} md={12} key={i}>
                    <SmallCard data={s.data} types={s.types} loading={loading} title={s.title} />
                  </Grid>
                )
              )
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
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
        </div>
      </Grid>
      <CustomFab actions={fabActions} />
    </Container>
  );
};

export default UsersPage;

