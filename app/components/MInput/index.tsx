import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { IProps } from './input.interface';

const MInput: React.FC<IProps> = ({ control, name, label, customRule }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={customRule}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label={label}
            variant="outlined"
            {...field}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
    </>
  );
};

export default MInput;
