import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Paper, Typography, Button } from '@mui/material';
import Link from 'next/link';

import MInput from '../MInput';
import PasswordField from '../MInput/PasswordField';
import { IFormInput } from './signup.interface';
import { emailRegex, passwordRegex } from '../../const';

const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Paper elevation={3} sx={{ width: '50%', mx: 'auto', mt: '4rem' }}>
      <Typography align="center" variant="h2" component="div">
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2rem 1rem' }}>
        <Stack spacing={2}>
          <MInput
            name="name"
            label="Введите имя"
            control={control}
            customRule={{
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 20, message: 'Имя слишком длинное' },
            }}
          />
          <MInput
            name="email"
            label="Введите email"
            control={control}
            customRule={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: emailRegex,
                message: 'Неверный формат email',
              },
            }}
          />
          <PasswordField
            name="password"
            label="Введите пароль"
            control={control}
            customRule={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: passwordRegex,
                message:
                  'Пароль должен содержать не менее 6 символов, включая одну заглавную букву, одну строчную букву, одну цифру и один спецсимвол',
              },
            }}
          />
          <Button variant="contained" type="submit">
            Зарегистрироваться
          </Button>
          <Typography align="center" variant="h6" component="div">
            Уже есть аккаунт?{' '}
            <Link href="./auth/signin">
              <a style={{ color: 'blue' }}>Войти</a>
            </Link>
          </Typography>
        </Stack>
      </form>
    </Paper>
  );
};

export default SignUp;
