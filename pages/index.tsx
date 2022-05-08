import type { NextPage } from 'next';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

import Layout from '../app/components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home Page">
      <Typography align="center" variant="h2" component="div" gutterBottom>
        It is Home Page
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Link href="/auth/signup" passHref>
          <Button variant="outlined">Регистрация</Button>
        </Link>
        <Link href="/auth/signin" passHref>
          <Button variant="outlined">Войти</Button>
        </Link>
      </Stack>
    </Layout>
  );
};

export default Home;
