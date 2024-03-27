import { TextField, Button, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User } from '../../../context/UserContext';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    first_name: yup
      .string()
      .required('First name is required')
      .min(3, 'min 3 characters'),
    last_name: yup.string().required('Last name').min(3, 'min 3 characters'),
  })
  .required();

type Props = {
  user?: User;
  onSave: (user: User) => void;
};

const EditUser: React.FC<Props> = ({ user, onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEdit = async (data: any) => {
    if (user) {
      user.email = data.email;
      user.first_name = data.first_name;
      user.last_name = data.last_name;

      onSave(user);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('email', user.email);
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
    }
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleEdit)}
      sx={{
        paddingTop: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        label="First name"
        variant="outlined"
        helperText={errors.first_name?.message}
        error={!!errors.first_name?.message}
        {...register('first_name')}
      />

      <TextField
        fullWidth
        label="Last name"
        variant="outlined"
        helperText={errors.last_name?.message}
        error={!!errors.last_name?.message}
        {...register('last_name')}
      />

      <TextField
        fullWidth
        label="E-mail"
        type="email"
        variant="outlined"
        helperText={errors.email?.message}
        error={!!errors.email?.message}
        {...register('email')}
      />

      <Button variant="contained" type="submit" fullWidth>
        Save change
      </Button>
    </Box>
  );
};

export default EditUser;
