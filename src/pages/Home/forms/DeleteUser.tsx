import { Button, Box, Typography } from '@mui/material';
import React from 'react';
import { User } from '../../../context/UserContext';

type Props = {
  user?: User;
  onDelete: (user: User) => void;
};

const DeleteUser: React.FC<Props> = ({ user, onDelete }) => {
  const handleDelete = (e: any) => {
    e.preventDefault();
    if (user) onDelete(user);
  };

  return (
    <Box
      component="form"
      onSubmit={handleDelete}
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
      <Typography variant="body1">
        Are you sure you want to delete the user {user?.first_name}{' '}
        {user?.last_name}?
      </Typography>
      <Button variant="contained" type="submit" fullWidth>
        Confirm delete
      </Button>
    </Box>
  );
};

export default DeleteUser;
