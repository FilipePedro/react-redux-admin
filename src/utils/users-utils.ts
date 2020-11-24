interface IHeadCells {
  id: string;
  numeric: boolean;
  avatar?: boolean;
  disablePadding: boolean;
  label: string;
}

export const headCells: IHeadCells[] = [
  {
    id: 'avatar',
    numeric: false,
    avatar: true,
    disablePadding: false,
    label: 'Photo',
  },
  {
    id: 'fullName',
    numeric: false,
    disablePadding: true,
    label: 'Full Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: true,
    label: 'Gender',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'Age',
  },
  {
    id: 'country',
    numeric: true,
    disablePadding: false,
    label: 'Nationality',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Created At',
  },
];