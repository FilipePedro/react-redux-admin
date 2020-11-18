
export interface ICountry {
  label: string
  value: string
}

interface IPicture {
  large?: string
}

export interface IUser {
  id: number
  fullName?: string
  email: string
  age: string
  gender: string
  nat: string
  location: Location
  country: ICountry
  picture?: IPicture
  createdAt: string
}

export interface IState {
  auth: {
    isLoggedIn?: boolean,
    user?: string | null
  },
  users: IUser[],
  apiCallsInProgress: number,
}