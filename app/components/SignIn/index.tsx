import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Paper, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import MInput from '../MInput';
import PasswordField from '../MInput/PasswordField';
import { IFormInput } from './signup.interface';
import Link from 'next/link';

const SignIn: React.FC = () => {
  const { control, handleSubmit } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Paper elevation={3} sx={{ width: '50%', mx: 'auto', mt: '4rem' }}>
      <Typography align="center" variant="h2" component="div">
        Авторизация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2rem 1rem' }}>
        <Stack spacing={2}>
          <MInput
            name="email"
            label="Введите email"
            control={control}
            customRule={{
              required: 'Поле обязательно для заполнения',
            }}
          />
          <PasswordField
            name="password"
            label="Введите пароль"
            control={control}
            customRule={{
              required: 'Поле обязательно для заполнения',
            }}
          />
          <Button variant="contained" type="submit" endIcon={<SendIcon />}>
            Отправить
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default SignIn;
