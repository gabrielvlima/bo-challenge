import { Typography, TextField, Button, Box } from '@mui/material';
import React from 'react';
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
  onCreate: (user: User) => void;
  error: string;
};

const NewUser: React.FC<Props> = ({ onCreate, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: any) => {
    onCreate(data);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleRegister)}
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
        Create user
      </Button>
      <Typography
        variant="subtitle2"
        color={t => t.palette.error.main}
        visibility={error ? 'visible' : 'hidden'}
      >
        {error}
      </Typography>
    </Box>
  );
};

export default NewUser;
