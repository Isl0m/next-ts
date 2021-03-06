import { useState } from 'react';
import {
  Stack,
  Typography,
  Divider,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDatabase, ref, set } from 'firebase/database';

import Avatar from '../Avatar';
import MInput from '../MInput';
import { useAppDispatch } from '../../hooks';
import { changeName } from '../../store/slices/userSlice';
export interface IProfilePageProps {
  name: string;
  email: string;
  id: string;
}
interface IFormInput {
  name: string;
}
const ProfilePage: React.FC<IProfilePageProps> = ({
  name: startName,
  email,
  id,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const handleClickOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleSubmitName = () => {
    handleSubmit(({ name }) => {
      console.log(name);
      dispatch(changeName(name));
      const db = getDatabase();
      set(ref(db, 'users/' + id), {
        email: email,
        name: name,
      });
    })();
    setOpen(false);
    reset();
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: '40%', mx: 'auto', mt: '4vh', p: '1rem' }}
    >
      <Stack spacing={2} justifyContent="center" alignItems="center">
        {startName && (
          <Avatar
            name={startName}
            style={{ width: 80, height: 80, fontSize: '2.5rem' }}
          />
        )}
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography variant="h4">{startName}</Typography>
          <IconButton onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        </Stack>
        <Divider flexItem />

        <Typography variant="h5">Ваш email: {email}</Typography>
        <Button>Поменять пароль</Button>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Поменять Имя</DialogTitle>
        <DialogContent>
          <MInput
            name="name"
            label="Введите имя"
            value={startName}
            control={control}
            customRule={{
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 20, message: 'Имя слишком длинное' },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmitName}>Поменять</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProfilePage;
