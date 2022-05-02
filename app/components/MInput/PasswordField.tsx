import { useState, FC } from 'react';
import { Controller } from 'react-hook-form';
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IProps } from './input.interface';

const PasswordField: FC<IProps> = ({ name, control, customRule, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={customRule}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="outlined" error={Boolean(error)}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            {...field}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText disabled id="outlined-adornment-password">
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PasswordField;
