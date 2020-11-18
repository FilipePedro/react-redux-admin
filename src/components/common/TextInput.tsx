import React from 'react';
import { FieldError } from "react-hook-form";
// material UI Imports
import TextField from '@material-ui/core/TextField';

interface errors {
  message: string,
}

interface TextInputProps {
  errors?: errors | FieldError,
  name?: string,
  label?: string,
  autoComplete?: string,
  autoFocus?: boolean,
  required?: boolean,
  type?: string,
  InputProps?: object,
  margin?: any
}


const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const { errors, name, margin } = props;
  return (
    <TextField
      {...props}
      margin={margin || 'none'}
      id={name}
      variant="outlined"
      fullWidth
      autoComplete="off"
      required
      error={!!errors}
      helperText={errors?.message}
    />
  );
};

export default TextInput;
