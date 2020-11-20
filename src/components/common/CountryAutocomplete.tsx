import React from 'react';
import { FieldError } from "react-hook-form";

// material imports
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// common imports
import { countryToFlag, getCountries, findCountryByLabel } from '../../utils/utils';
import { ICountry } from '../../types';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

interface errors {
  message: string,
}

interface CountrySelectorProps {
  onChange?: (options: ICountry | null) => void,
  errors?: errors | FieldError,
  value?: ICountry | any,
  required?: boolean,
}

interface inputProps {
  value?: ICountry | any,
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  onChange,
  errors,
  value,
  required,
}) => {
  const classes = useStyles();

  const countries: ICountry[] = getCountries();
  const handleCountry = findCountryByLabel(value, countries);

  return (
    <Autocomplete
      options={countries}
      getOptionLabel={(option) => option.label}
      onChange={(e, options) => onChange && onChange(options)}
      classes={{ option: classes.option }}
      renderOption={(option) => (
        <>
          <span>
            {
              option
                ? countryToFlag(option.value)
                : null
            }
          </span>
          <span>{option.label}</span>
        </>
      )}
      renderInput={(params) => {
        const startAdornment = (
          <InputAdornment position="start">
            <span>
              {
                handleCountry ? countryToFlag(handleCountry.value) : null
              }
            </span>
          </InputAdornment>
        );

        const newInputProps = {
          ...params.InputProps,
          ...(value && { startAdornment }),
        };

        // set initial value if present and flag
        const inputProps: inputProps = params.inputProps;
        const l: number = inputProps?.value?.length;
        const handleInputValue = inputProps.value && l > 0
          ? inputProps.value
          : value?.label || '';

        return (
          <TextField
            {...params}
            InputProps={newInputProps}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              value: handleInputValue,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            required={required}
            label="Choose a country"
            error={!!errors}
            helperText={errors?.message}
          />
        );
      }}
    />
  );
};

export default CountrySelector;