import React from 'react';
import { FieldError } from "react-hook-form";

// material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
}));

interface errors {
  message: string,
}

interface SelectInputProps {
  name?: string;
  options: string[];
  onChange?: (e: any) => void;
  errors?: errors | FieldError;
  value?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = (props: SelectInputProps) => {
  const classes = useStyles();

  const {
    name,
    options,
    onChange,
    errors,
    value,
    required,
  } = props;

  return (
    <FormControl
      variant="outlined"
      required={required}
      className={`${classes.formControl} ${classes.capitalize}`}
      error={!!errors}
    >
      <InputLabel className={classes.capitalize} id={name}>{name}</InputLabel>
      <Select
        id={name}
        onChange={(event) => {
          onChange && onChange(event?.target?.value || value)
        }}
        label={name}
        value={value}
      >
        {
          options.map((opt: string, i: number) => (
            <MenuItem
              className={classes.capitalize}
              key={i} value={opt}>{opt.length > 0 ? opt : null}
            </MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{errors?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;