import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// material UI imports
import { lighten, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';

// common imports
import { DataTableToolbarProps } from './types';

const useToolbarStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 50%',
  },
}));

const DataTableTooblar = (props: DataTableToolbarProps) => {
  const classes = useToolbarStyles();
  const {
    selected, deleteAction, resetSelected,
  } = props;

  const numSelected = selected.length;

  const handleDeleteClick = async () => {
    deleteAction(selected);
    resetSelected();
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0
        ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Users
          </Typography>
        )}
      { numSelected === 1 && (
        <>
          <Tooltip title="Edit">
            <Link to={`/edit/${selected[0]}`}>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {numSelected > 1 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar >
  );
};

export default DataTableTooblar;
