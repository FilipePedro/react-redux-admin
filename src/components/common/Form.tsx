import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

// material UI imports
import {
  InputAdornment,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// common imports
import TextInput from './TextInput';
import { getValidation } from '../../utils/validations';
import ButtonArea from './ButtonArea';
// import { genderOptions } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

interface FormProps {
  data?: any;
  fields: any;
  loading: boolean;
  buttons: any;
  submitAction: (data: any) => void;
}

const CustomForm: React.FC<FormProps> = (props) => {
  const classes = useStyles();
  const { data, fields, loading, submitAction, buttons } = props;

  // set default values for userForm
  const defaultValues = fields.reduce((acc: {}, d: any) => {
    return {
      ...acc,
      [d]: data && data[d] ? data[d] : ''
    }
  }, {});

  const {
    register,
    handleSubmit,
    errors,
    control,
    formState,
  } = useForm({ defaultValues });

  const [visible, handleVisible] = useState(false);

  // Read the formState before render to subscribe the form state through Proxy
  const { isDirty } = formState;

  useEffect(() => {
    console.log('form rendered...')
    // register form dynamically validations
    for (const f of fields) {
      if (f === 'remember') return;
      register(f, getValidation(f));
    }
  }, [register, fields]);

  // handle visible password action
  const handleClickShowPassword = () => handleVisible(!visible)
  const handleMouseDownPassword = (event: SyntheticEvent) => event.preventDefault();

  const onSubmit = async (data: any) => {
    submitAction(data);
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {
          fields.map((f: string, i: number) => {
            switch (f) {
              case 'email':
                return (
                  <Grid item xs={12} key={i}>
                    <Controller
                      name="email"
                      control={control}
                      // bugfix on react hook form library warning
                      render={({ ref, ...otherProps }) => (
                        <TextInput
                          {...otherProps}
                          label='Email Address'
                          margin='normal'
                          autoComplete="email"
                          autoFocus
                          errors={errors?.email} />
                      )}
                    />
                  </Grid>
                )
              case 'password':
                return (
                  <Grid item xs={12} key={i}>
                    <Controller
                      name="password"
                      control={control}
                      // bugfix on react hook form library warning
                      render={({ ref, ...otherProps }) => (
                        <TextInput
                          {...otherProps}
                          label="Password"
                          autoComplete="current-password"
                          type={visible ? 'text' : 'password'}
                          errors={errors?.password}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {visible ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>,
                          }}
                        />
                      )}
                    />
                  </Grid>
                )
              case 'remember':
                return (
                  <Grid item xs={12} key={i}>
                    <FormControlLabel
                      control={<Checkbox inputRef={register} name="remeber" color="primary" defaultValue={''} />}
                      label="Remember me"
                    />
                  </Grid>
                )
              default:
                break;
            }
            return true;
          })
        }
        <ButtonArea loading={loading} isDirty={isDirty} buttons={buttons} />
      </Grid>
    </form>
  );
}

export default CustomForm;