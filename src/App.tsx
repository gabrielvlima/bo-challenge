import { useContext, useEffect } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { UserContext } from './context/UserContext';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as ThemeProviderMUI,
  createTheme,
} from '@mui/material/styles';
import { Box } from '@mui/material';
import { Loading } from './components/Loading';
import { publicRoute } from './Routes/publicRoute';
import { authRoute } from './Routes/authRoute';
import { RouterProvider } from 'react-router-dom';

function App() {
  const { theme } = useContext(ThemeContext);
  const { loading, isUserEmpty, verifyUser } = useContext(UserContext);

  const customTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <ThemeProviderMUI theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
        }}
      >
        {loading ? (
          <Loading size={200} />
        ) : (
          <RouterProvider router={isUserEmpty() ? publicRoute : authRoute} />
        )}
      </Box>
    </ThemeProviderMUI>
  );
}

export default App;
