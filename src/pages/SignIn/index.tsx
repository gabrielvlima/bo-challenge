import { Link, Typography, TextField, Button, Box } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getError } from '../../utils/errorstreatment';
import CircularProgress from '@mui/material/CircularProgress';
import { login, getUser } from './requests';
import { User, UserContext } from '../../context/UserContext';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  })
  .required();

const SignIn: React.FC = () => {
  const { setUserData, setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigate();

  const handleNavigateRegister = () => {
    navigation('/register');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: any) => {
    setLoading(true);
    try {
      setError('');
      const token = (await login(data)) as string;
      setToken(token);

      const user = (await getUser(data.email, token)) as User;
      setUserData(user);
    } catch (err) {
      setError(getError(err));
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h3">Sign In</Typography>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: '100%',
        }}
      >
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
        <Button variant="contained" type="submit" disabled={loading} fullWidth>
          {loading ? <CircularProgress /> : 'Login'}
        </Button>
      </Box>

      <Typography
        variant="subtitle2"
        color={t => t.palette.error.main}
        visibility={error ? 'visible' : 'hidden'}
      >
        {error}
      </Typography>
      <Typography variant="subtitle2">
        You not register?{' '}
        <Link
          component="button"
          underline="none"
          onClick={handleNavigateRegister}
        >
          Register here!
        </Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
