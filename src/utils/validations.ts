const validations = {
  email: {
    required: {
      value: true,
      message: 'Email is required.',
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address.',
    },
  },
  fullName: {
    required: {
      value: true,
      message: 'Full Name is required',
    },
    pattern: {
      value: /^[/A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
      message: 'Invalid full name.',
    },
    minLength: {
      value: 5,
      message: 'Minimum 5 character length.',
    },
    maxLength: {
      value: 30,
      message: 'Maximum 30 character length.',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password is required.',
    },
    minLength: {
      value: 5,
      message: 'Minimum 5 character length.',
    },
  },
  age: {
    required: {
      value: true,
      message: 'Age is required',
    },
    min: {
      value: 10,
      message: 'Minimum age: 10',
    },
    max: {
      value: 100,
      message: 'Maximum age: 100',
    },
  },
  remember: {},
  gender: {
    required: {
      value: true,
      message: 'Gender is required',
    },
  },
  country: {
    required: {
      value: true,
      message: 'Country is required',
    },
    // validate: (value) => value || 'NAT is required.',
  },
};

interface IValidations {
  email: string,
  fullName: string,
  age: string,
  gender: string,
  country: string,
}

export const getValidation = <K extends keyof IValidations>(key: K) =>
  validations[key];
