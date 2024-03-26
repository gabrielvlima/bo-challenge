import { Link, Typography, TextField, Button, Box } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { getError } from '../../utils/errorstreatment';
import { getUser, registerUser } from './requests';
import { User, UserContext } from '../../context/UserContext';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
    confirmPassword: yup
      .string()
      .min(8)
      .required()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

const SignUp: React.FC = () => {
  const { setUserData, setToken } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigate();

  const handleNavigateLogin = () => {
    navigation('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: any) => {
    setLoading(true);
    try {
      setError('');
      const { id, token } = await registerUser(data);
      setToken(token);

      const user = (await getUser(id, token)) as User;
      setUserData(user);

      navigation('/');
    } catch (err) {
      setError(getError(err));
    }
    setLoading(false);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleRegister)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Sign Up</Typography>
      <TextField
        fullWidth
        label="E-mail"
        type="email"
        variant="outlined"
        disabled={loading}
        helperText={errors.email?.message}
        error={!!errors.email?.message}
        {...register('email')}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        disabled={loading}
        helperText={errors.password?.message}
        error={!!errors.password?.message}
        {...register('password')}
      />
      <TextField
        fullWidth
        label="Confirm password"
        type="password"
        variant="outlined"
        disabled={loading}
        helperText={errors.confirmPassword?.message}
        error={!!errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button variant="contained" disabled={loading} type="submit" fullWidth>
        {loading ? <CircularProgress /> : 'Register'}
      </Button>
      <Typography
        variant="subtitle2"
        color={t => t.palette.error.main}
        visibility={error ? 'visible' : 'hidden'}
      >
        {error}
      </Typography>
      <Typography variant="subtitle2">
        Do you already have a registration?{' '}
        <Link component="button" underline="none" onClick={handleNavigateLogin}>
          Login here!
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
