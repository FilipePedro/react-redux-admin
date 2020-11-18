import moment from 'moment';
import { wait } from '../utils/utils';

interface loginInterface {
  email: string,
  password: string,
}

const login = async ({ email, password }: loginInterface) => {
  await wait(2000);

  if (email === 'demo@teste.com' && password === '123456') {
    localStorage.setItem('user', JSON.stringify({ value: email, expiry: moment().add(120, 'minutes') }));
    return true;
  }
  throw new Error('Invalid Login Attempt!');
};

const getLocalAuthByKey = (key: string) => {
  const string = localStorage.getItem(key) || null;
  const item = string ? JSON.parse(string) : {};
  const now = moment();
  // compare the expiry time of the item with the current time
  if (now.isAfter(item.expiry)) {
    // If the item is expired, delete the item from storage
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const logout = () => localStorage.removeItem('user');

const authService = {
  login, logout, getLocalAuthByKey
}

export default authService;
