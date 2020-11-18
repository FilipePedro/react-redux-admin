import moment from 'moment';
// @ts-expect-error
import countryList from 'react-select-country-list';

// common imports
import { IUser, ICountry } from '../types';

/* ASYNC UTILS */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* DATE UTILS */
const maskDate = (date: string) => moment(date).format('YYYY/MM/DD HH:mm:ss'); // Displays 25th Mar 2019

/* COUNTRY UTILS */
const getCountries = () => countryList().getData();

/* GENDER UTILS */
const genderOptions: string[] = ['', 'male', 'female'];

const findCountryByLabel = (value?: string | ICountry, countries: ICountry[] = getCountries()) => countries.filter((c) => {
  if (!value) return false;
  // used .include to avoid problems with countrie library, ie: Iran
  if (typeof value === 'string') return c.label.includes(value);
  return c.label.includes(value?.label);
})[0];

const countryToFlag = (isoCode: string) => (typeof String.fromCodePoint !== 'undefined'
  ? isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
  : isoCode);


/* DATATABLE UTILS */
const _descendingComparator = (a: IUser | any, b: IUser | any, orderBy: string): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order: string, orderBy: string) => {
  const t = order === 'desc'
    ? (a: IUser, b: IUser) => _descendingComparator(a, b, orderBy)
    : (a: IUser, b: IUser) => -_descendingComparator(a, b, orderBy);
  return t;
};

const stableSort = (array: IUser[], comparator: (a: IUser, b: IUser) => number) => {
  const stabilizedThis = array.map((el, index) => [el]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return +a[1] - +b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const handleRowSelection = (selected: number[], id: number) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected: number[] = [];

  if (selectedIndex === -1) {
    newSelected = [...selected, id];
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }
  return newSelected;
}

export {
  getComparator,
  stableSort,
  handleRowSelection,
  maskDate,
  getCountries,
  countryToFlag,
  genderOptions,
  findCountryByLabel,
  wait
}