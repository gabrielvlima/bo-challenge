import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { User } from '../context/UserContext';
import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { ThemeContext } from '../context/ThemeContext';

type Props = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export const Card: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  const { theme } = useContext(ThemeContext);

  const handleEdit = () => {
    onEdit(user);
  };

  const handleDelete = () => {
    onDelete(user);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        margin: '8px 16px',
      }}
    >
      <Box
        sx={{
          padding: '16px',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid black',
        }}
      >
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt={`avatar of ${user.first_name} ${user.last_name}`}
          src={user.avatar}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          padding: '16px',
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          backgroundColor: t =>
            theme === 'light' ? t.palette.grey[200] : t.palette.grey[900],
          position: 'relative',
        }}
      >
        <Typography variant="h5">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="subtitle1">{user.email}</Typography>

        <Tooltip title="Edit" placement="right" onClick={handleEdit}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
            }}
          >
            <Edit color="info" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="right">
          <IconButton
            onClick={handleDelete}
            sx={{
              position: 'absolute',
              bottom: 5,
              right: 5,
            }}
          >
            <Delete color="error" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
