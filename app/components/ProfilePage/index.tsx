import { Stack, Typography, Divider, Paper, Button } from '@mui/material';

import Avatar from './Avatar';

export interface IProfilePageProps {
  name: string;
  email: string;
}
const ProfilePage: React.FC<IProfilePageProps> = ({ name, email }) => {
  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: '40%', mx: 'auto', mt: '4vh', p: '1rem' }}
    >
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Avatar
          name={name}
          style={{ width: 80, height: 80, fontSize: '2.5rem' }}
        />
        <Typography variant="h4">{name}</Typography>
        <Divider flexItem />

        <Typography variant="h5">Ваш email: {email}</Typography>
        <Button>Поменять пароль</Button>
      </Stack>
    </Paper>
  );
};

export default ProfilePage;
