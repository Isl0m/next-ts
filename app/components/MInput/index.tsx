import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { IProps } from './input.interface';

const MInput: React.FC<IProps> = ({
  control,
  name,
  label,
  value,
  customRule,
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={value ? value : ''}
        rules={customRule}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label={label}
            variant="outlined"
            value={value}
            {...field}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
    </div>
  );
};

export default MInput;
