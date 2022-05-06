import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Paper, Typography, Button } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MInput from '../MInput';
import PasswordField from '../MInput/PasswordField';
import { IFormInput } from './signup.interface';
import { emailRegex, passwordRegex } from '../../const';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = ({ name, email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            name: name,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        const db = getDatabase();
        set(ref(db, 'users/' + user.uid), {
          username: name,
          email: email,
        });
      })
      .catch(console.error);

    router.push('/');
    reset();
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
                  'Пароль должен содержать не менее 8 символов, включая одну строчную букву и одну цифру ',
              },
            }}
          />
          <Button variant="contained" type="submit">
            Зарегистрироваться
          </Button>
          <Typography align="center" variant="h6" component="div">
            Уже есть аккаунт?{' '}
            <Link href="/auth/signin">
              <a style={{ color: '#1976d2' }}>Войти</a>
            </Link>
          </Typography>
        </Stack>
      </form>
    </Paper>
  );
};

export default SignUp;
