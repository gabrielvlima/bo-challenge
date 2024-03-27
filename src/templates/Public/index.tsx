import { Container } from '@mui/material';
import React from 'react';

import Logo from '../../assets/logo.png';
import { Outlet } from 'react-router-dom';

const PublicTemplate: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderSpacing: 1,
        borderStyle: 'solid',
        borderRadius: 16,
        gap: 1,
        marginY: 10,
        padding: 10,
      }}
    >
      <img src={Logo} alt="logo" />
      <Outlet />
    </Container>
  );
};

export default PublicTemplate;
