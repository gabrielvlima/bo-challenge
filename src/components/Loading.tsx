import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
  size?: number;
};

export const Loading: React.FC<Props> = ({ size = 40 }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};
