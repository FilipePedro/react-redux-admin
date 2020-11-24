import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { countryToFlag } from '../../utils/utils';
import { makeStyles, Theme, Tooltip } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme: Theme) => ({
  avatarGroup: {
    marginRight: theme.spacing(2)
  },
  avatar: {
    backgroundColor: grey[100],
  }
}));


const GroupAvatars = (props: any) => {
  const classes = useStyles();
  const { countries } = props;
  const handleToolTipTitle = () => countries.reduce((acc: string, c: any) => { return `${acc} ${c.country},` }, '')
  return (
    <Tooltip title={handleToolTipTitle()} placement="top">
      <AvatarGroup max={6} className={classes.avatarGroup}>
        {
          countries.map((c: any, i: number) => (
            <Avatar key={i} alt={c.country} className={classes.avatar}>{c.value ? countryToFlag(c.value) : null}</Avatar>
          ))
        }
      </AvatarGroup >
    </Tooltip>

  );
}

export default GroupAvatars;