import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Paper, Typography, Button } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MInput from '../MInput';
import PasswordField from '../MInput/PasswordField';
import { IFormInput } from './signup.interface';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks';

const SignIn: React.FC = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    const auth = getAuth();
    const dbRef = ref(getDatabase());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        get(child(dbRef, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              dispatch(
                setUser({
                  name: snapshot.val().name,
                  email: user.email,
                  id: user.uid,
                  token: user.refreshToken,
                })
              );
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
        alert('Вошли в систему');
        route.push('/');
      })
      .catch(() => alert('Invalid user!'));
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
          <Button variant="contained" type="submit">
            Войти
          </Button>
          <Typography align="center" variant="h6" component="div">
            Нет аккаунта?{' '}
            <Link href="/auth/signup">
              <a style={{ color: '#1976d2' }}>Зарегистрироваться</a>
            </Link>
          </Typography>
        </Stack>
      </form>
    </Paper>
  );
};

export default SignIn;
