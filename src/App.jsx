import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import store from './store';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import FleetMap from './pages/FleetMap/FleetMap';
import RouteOptimization from './pages/RouteOptimization/RouteOptimization';
import CargoManagement from './pages/CargoManagement/CargoManagement';
import Reports from './pages/Reports/Reports';
import Chatbot from './components/Chatbot/Chatbot';
import './styles/custom.css';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Layout onThemeToggle={() => setIsDarkMode(!isDarkMode)}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/fleet" element={<FleetMap />} />
                <Route path="/routes" element={<RouteOptimization />} />
                <Route path="/cargo" element={<CargoManagement />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </Layout>
            <Chatbot />
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
