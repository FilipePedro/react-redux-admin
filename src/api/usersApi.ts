import axios from 'axios';
import moment from 'moment';

// common imports
import avatar from '../assets/images/avatar.png';
import { IUser } from '../types';
import { wait } from '../utils/utils';

const baseUrl = 'https://randomuser.me/api/';

// id controller variable
let idController = 0;
const replaceBadLabels = (s: string) => s === 'Iran' ? 'Iran, Islamic Republic of' : s

// helper transformer for external user api
const userTransformer = (data: any[], idController?: number, newDate?: boolean): IUser[] =>
  data.reduce((acc: [], d: any, i: number) => [
    ...acc,
    {
      id: idController ? idController + i : i + 1,
      fullName: d.fullName ? d.fullName : `${d.name.first} ${d.name.last}`,
      email: d.email,
      gender: d.gender,
      country: d.country ? d.country : { label: replaceBadLabels(d.location.country), value: d.nat },
      age: d.dob ? d.dob.age : d.age,
      createdAt: !newDate ? d.registered?.date || d.createdAt : moment().add(i, 'seconds').toISOString(),
      picture: d.picture,
    }], []);

export const fetchUsers = async (n = 1000) => {
  await wait(1000);
  const { data } = await axios.get(`${baseUrl}?results=${n}`);

  const users = userTransformer(data.results);

  idController = n + 1;
  return users;
};

export const deleteUser = async (selected: number[]) => {
  await wait(1000);
  return selected;
};

export const getRandomUsers = async (n = 10) => {
  await wait(500);
  const { data } = await axios.get(`${baseUrl}?results=${n}`);

  const users = userTransformer(data.results, idController + 1, true);

  idController += n;
  return users;
};

export const addUser = async (newUserData: IUser) => {
  await wait(2000);

  const newData = {
    ...newUserData,
    picture: { large: avatar }
  }

  const newUser = userTransformer([newData], idController + 1, true)[0];

  idController += 1;
  return newUser;
};

interface editUserParams {
  userToUpdate: IUser,
  data: IUser,
}

export const editUser = async ({ userToUpdate, data }: editUserParams) => {
  await wait(1000);
  const t = [{ ...userToUpdate, ...data }]
  const editedUser = userTransformer(t, userToUpdate.id)[0];
  return editedUser;
};
