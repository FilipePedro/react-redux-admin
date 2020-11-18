import React, { useEffect, useState, SyntheticEvent } from 'react';
// @ts-ignore
import { loadCSS } from 'fg-loadcss';

// material UI imports
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Checkbox,
  Avatar,
  Tooltip,
  IconButton,
  TablePagination
} from '@material-ui/core';

// common imports
import DataTableHead from './DataTableHead';
import DataTableToolbar from './DataTableToolbar';
import {
  getComparator,
  stableSort,
  handleRowSelection,
  maskDate,
  countryToFlag
} from '../../../utils/utils';
import { EnhancedTableProps, direction } from './types'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 600,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  avatar: {
    margin: '0 auto',
  },
  loadingCell: {
    padding: theme.spacing(5),
  },
}));

const EnhancedTable: React.FC<EnhancedTableProps> = (props: EnhancedTableProps) => {
  const {
    rows, headerCells, deleteAction, loading, generateRandom,
  } = props;
  const classes = useStyles();

  const [order, setOrder] = useState<direction>('desc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: SyntheticEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: SyntheticEvent, id: number) => {
    const newSelected = handleRowSelection(selected, id);
    setSelected(newSelected);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const resetSelected = () => setSelected([]);

  useEffect(() => {
    // necessary to use fa icons with material UI
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DataTableToolbar
          selected={selected}
          resetSelected={resetSelected}
          deleteAction={deleteAction}
          generateRandom={generateRandom}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <DataTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headerCells}
            />
            <TableBody>
              {
                loading
                  ? (
                    <TableRow>
                      <TableCell colSpan={100} align="center" className={classes.loadingCell}>
                        <CircularProgress color="secondary" />
                      </TableCell>
                    </TableRow>
                  )
                  : stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Avatar
                              alt={row.fullName}
                              src={row.picture?.large}
                              className={classes.avatar}
                            />
                          </TableCell>
                          <TableCell align="center">{row.fullName}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">
                            <Tooltip title={row.gender} placement="right">
                              {row.gender === 'male'
                                ? (<IconButton color="primary" className="fas fa-mars" />) : (<IconButton color="secondary" className="fas fa-venus" />)
                              }
                            </Tooltip>
                          </TableCell>
                          <TableCell align="right">{row.age}</TableCell>
                          <TableCell align="right">
                            <Tooltip title={row.country?.label} placement="right">
                              <IconButton aria-label="country">
                                {row.country?.value ? countryToFlag(row.country.value) : null}
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="right" >{maskDate(row.createdAt)}</TableCell>
                        </TableRow>
                      );
                    })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div >
  );
};

export default EnhancedTable;
