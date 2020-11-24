import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CustomSpinner from './CustomSpinner';
import CountryAvatarGroup from './CountryAvatarGroup';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    padding: '8px 16px 0 16px',
  },
  noPaddingTopBot: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  male: {
    color: theme.palette.getContrastText('#ced4f7'),
    backgroundColor: '#ced4f7',
  },
  female: {
    color: theme.palette.getContrastText('#ffbad2'),
    backgroundColor: '#ffbad2',
  },
}));

interface CardProps {
  loading: boolean;
  types: string;
  title: string;
  data?: any;
}

const SimpleCard = (props: CardProps) => {
  const classes = useStyles();
  const { loading, title, data, types } = props;

  const handleLists = (types: string) => {
    switch (types) {
      case 'averageAge':
        return (
          <>
            <ListItem className={classes.noPaddingTopBot}>
              <ListItemAvatar>
                <Avatar>
                  T
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${data?.averageTotal}`} secondary='global average.' />
            </ListItem>
            <ListItem className={classes.noPaddingTopBot}>
              <ListItemAvatar>
                <Avatar className={classes.male}>
                  M
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${data?.averageMale}`} secondary='average ♂ age.' />
            </ListItem>
            <ListItem className={classes.noPaddingTopBot}>
              <ListItemAvatar>
                <Avatar className={classes.female}>
                  F
                 </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${data?.averageFemale}`} secondary='average ♀ age.' />
            </ListItem>
          </>
        );
      case 'genderPer':
        return (
          <>
            <ListItem className={classes.noPaddingTopBot}>
              <ListItemAvatar>
                <Avatar className={classes.male}>
                  M
                              </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${data?.malePer}%`} secondary={`Total: ${data?.male}`} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.female}>
                  F
                               </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${data?.femalePer}%`} secondary={`Total: ${data?.female}`} />
            </ListItem>
          </>
        );
      case 'countryRep':
        return (
          <>
            <ListItem className={classes.noPaddingTopBot}>
              <CountryAvatarGroup countries={data.max} />
              <ListItemText primary={`${data.max[0]?.count}`} secondary='users' />
            </ListItem>
            <ListItem className={classes.noPaddingTopBot}>
              <CountryAvatarGroup countries={data.min} />
              <ListItemText primary={`${data.min[0]?.count}`} secondary='users' />
            </ListItem>
          </>
        )
      default:
        break;
    }
  }

  return (
    <Card className={classes.card}>
      {
        !loading
          ? (
            <>
              <CardContent style={{ paddingBottom: 0 }} className={classes.cardContent}>
                <Typography variant="h6" component="h2" >
                  {title}
                </Typography>
                <List className={classes.root}>
                  {handleLists(types)}
                </List>
              </CardContent>
            </>
          )
          : (<CustomSpinner />)
      }
    </Card>
  )
};

export default SimpleCard;
