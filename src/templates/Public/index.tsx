import { Box } from '@mui/material'
import React from 'react'

import Logo from '../../assets/logo.png'
import { Outlet } from 'react-router-dom'

const PublicTemplate: React.FC = () => {
  return (
    <Box
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
      borderColor={t => t.palette.primary.main}
    >
      <img src={Logo} alt="logo" />
      <Outlet />
    </Box>
  )
}

export default PublicTemplate
