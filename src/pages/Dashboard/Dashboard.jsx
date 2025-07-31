import React from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  LocalShipping,
  DirectionsBus,
  Train,
  Warning,
  CheckCircle,
  Schedule,
  Speed
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

const Dashboard = () => {
  const { vehicles } = useSelector(state => state.vehicles);
  const { routes } = useSelector(state => state.routes);
  const { alerts } = useSelector(state => state.ui);

  // Datos simulados para gráficos
  const performanceData = [
    { name: 'Lun', efficiency: 85, onTime: 92 },
    { name: 'Mar', efficiency: 88, onTime: 89 },
    { name: 'Mié', efficiency: 82, onTime: 94 },
    { name: 'Jue', efficiency: 90, onTime: 87 },
    { name: 'Vie', efficiency: 87, onTime: 91 },
    { name: 'Sáb', efficiency: 85, onTime: 88 },
    { name: 'Dom', efficiency: 83, onTime: 90 }
  ];

  const vehicleTypeData = [
    { name: 'Camiones', value: vehicles.filter(v => v.type === 'truck').length, color: '#8884d8' },
    { name: 'Buses', value: vehicles.filter(v => v.type === 'bus').length, color: '#82ca9d' },
    { name: 'Trenes', value: vehicles.filter(v => v.type === 'train').length, color: '#ffc658' },
    { name: 'Tractomulas', value: vehicles.filter(v => v.type === 'trailer').length, color: '#ff7300' }
  ];

  const routeEfficiencyData = [
    { name: 'Ruta Norte', planned: 45, actual: 42 },
    { name: 'Ruta Sur', planned: 38, actual: 40 },
    { name: 'Ruta Este', planned: 52, actual: 48 },
    { name: 'Ruta Oeste', planned: 41, actual: 39 }
  ];

  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const totalVehicles = vehicles.length;
  const activeRoutes = routes.filter(r => r.status === 'active').length;
  const maintenanceVehicles = vehicles.filter(v => v.mechanicalStatus === 'maintenance').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'truck': return <LocalShipping />;
      case 'bus': return <DirectionsBus />;
      case 'train': return <Train />;
      default: return <LocalShipping />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Ejecutivo
      </Typography>
      
      {/* KPIs Principales */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Vehículos Activos
                  </Typography>
                  <Typography variant="h4">
                    {activeVehicles}/{totalVehicles}
                  </Typography>
                </Box>
                <CheckCircle color="success" sx={{ fontSize: 40 }} />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(activeVehicles / totalVehicles) * 100} 
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Rutas Activas
                  </Typography>
                  <Typography variant="h4">
                    {activeRoutes}
                  </Typography>
                </Box>
                <Speed color="primary" sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                +12% vs semana anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    En Mantenimiento
                  </Typography>
                  <Typography variant="h4">
                    {maintenanceVehicles}
                  </Typography>
                </Box>
                <Warning color="warning" sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                Requiere atención
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Eficiencia Promedio
                  </Typography>
                  <Typography variant="h4">
                    87%
                  </Typography>
                </Box>
                <TrendingUp color="success" sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                +3% vs mes anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos y Análisis */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Rendimiento Semanal
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Eficiencia (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="onTime" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Puntualidad (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Distribución de Flota
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Eficiencia por Ruta (Tiempo en minutos)
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={routeEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="planned" fill="#8884d8" name="Planificado" />
                <Bar dataKey="actual" fill="#82ca9d" name="Real" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Estado de Vehículos
            </Typography>
            <List>
              {vehicles.slice(0, 5).map((vehicle) => (
                <React.Fragment key={vehicle.id}>
                  <ListItem>
                    <ListItemIcon>
                      {getVehicleIcon(vehicle.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${vehicle.plate} - ${vehicle.driver}`}
                      secondary={`Ubicación: ${vehicle.location.lat.toFixed(4)}, ${vehicle.location.lng.toFixed(4)}`}
                    />
                    <Box>
                      <Chip 
                        label={vehicle.status} 
                        color={getStatusColor(vehicle.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={vehicle.mechanicalStatus} 
                        color={vehicle.mechanicalStatus === 'good' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Alertas Recientes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Alertas Recientes
            </Typography>
            <List>
              {alerts.slice(0, 3).map((alert) => (
                <ListItem key={alert.id}>
                  <ListItemIcon>
                    <Warning color={alert.severity === 'high' ? 'error' : 'warning'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={alert.message}
                    secondary={new Date(alert.timestamp).toLocaleString()}
                  />
                  <Chip 
                    label={alert.severity} 
                    color={alert.severity === 'high' ? 'error' : 'warning'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;