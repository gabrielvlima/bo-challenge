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
        margin: 4,
        padding: 2,
        maxWidth: '500px !important',
        maxHeight: '800px !important',
      }}
    >
      <img
        src={Logo}
        alt="logo"
        style={{
          height: '120px',
          width: 'auto',
        }}
      />
      <Outlet />
    </Container>
  );
};

export default PublicTemplate;
