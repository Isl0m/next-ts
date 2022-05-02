import { useState, FC } from 'react';
import { Controller } from 'react-hook-form';
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IProps } from './input.interface';

const PasswordField: FC<IProps> = ({ name, control, customRule, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(true);
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
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
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
          {...field}
          label={label}
          error={Boolean(error)}
        />
      )}
    />
  );
};

export default PasswordField;
