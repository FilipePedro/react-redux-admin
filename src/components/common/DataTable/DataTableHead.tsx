import React, { SyntheticEvent } from 'react';

// material UI imports
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel
} from '@material-ui/core';

// common imports
import { DataTableHeadProps, directionProps } from './types';

const DataTableHead = (props: DataTableHeadProps) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;

  const createSortHandler = (property: string) => (event: SyntheticEvent) => {
    onRequestSort(event, property);
  };

  const handleDirection = (id: string): directionProps => orderBy === id ? order : 'asc';

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all users' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={handleDirection(headCell.id)}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              // @ts-ignore
              direction={handleDirection(headCell.id)}
              onClick={!headCell.avatar ? createSortHandler(headCell.id) : null}
              hideSortIcon={headCell.avatar}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead >
  );
};

export default DataTableHead;