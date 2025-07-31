import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  CardActions,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Slider,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Route as RouteIcon,
  Schedule,
  Speed,
  Warning,
  CheckCircle,
  LocalShipping,
  AccessTime,
  TrendingUp,
  Settings,
  PlayArrow,
  Stop,
  Refresh
} from '@mui/icons-material';
import { setOptimizing, setRouteSuggestions, addRoute } from '../../store/slices/routeSlice';

const RouteOptimization = () => {
  const dispatch = useDispatch();
  const { routes, routeOptimization } = useSelector(state => state.routes);
  const { vehicles } = useSelector(state => state.vehicles);
  
  const [activeStep, setActiveStep] = useState(0);
  const [routeParams, setRouteParams] = useState({
    cargoType: 'general',
    priority: 'standard',
    vehicleType: 'truck',
    maxWeight: 10,
    timeRestrictions: false,
    startTime: '08:00',
    endTime: '18:00',
    avoidTolls: false,
    preferHighways: true
  });

  const [optimizationResults, setOptimizationResults] = useState([
    {
      id: 1,
      name: 'Ruta Optimizada A',
      distance: '23.5 km',
      estimatedTime: '38 min',
      fuelCost: '$45,000',
      efficiency: 92,
      waypoints: 4,
      trafficLevel: 'medium',
      savings: '15%'
    },
    {
      id: 2,
      name: 'Ruta Optimizada B',
      distance: '26.2 km',
      estimatedTime: '42 min',
      fuelCost: '$48,500',
      efficiency: 88,
      waypoints: 3,
      trafficLevel: 'low',
      savings: '8%'
    },
    {
      id: 3,
      name: 'Ruta Optimizada C',
      distance: '21.8 km',
      estimatedTime: '45 min',
      fuelCost: '$42,000',
      efficiency: 85,
      waypoints: 5,
      trafficLevel: 'high',
      savings: '12%'
    }
  ]);

  const steps = [
    'Configurar Parámetros',
    'Seleccionar Restricciones',
    'Ejecutar Optimización',
    'Revisar Resultados'
  ];

  const handleParamChange = (param, value) => {
    setRouteParams(prev => ({ ...prev, [param]: value }));
  };

  const handleOptimize = () => {
    dispatch(setOptimizing(true));
    // Simular proceso de optimización
    setTimeout(() => {
      dispatch(setOptimizing(false));
      dispatch(setRouteSuggestions(optimizationResults));
      setActiveStep(3);
    }, 3000);
  };

  const handleApplyRoute = (route) => {
    const newRoute = {
      id: Date.now(),
      name: route.name,
      type: routeParams.vehicleType,
      origin: { lat: 4.6097, lng: -74.0817, name: 'Origen' },
      destination: { lat: 4.6351, lng: -74.0703, name: 'Destino' },
      waypoints: [],
      distance: route.distance,
      estimatedTime: route.estimatedTime,
      priority: routeParams.priority,
      cargoType: routeParams.cargoType,
      status: 'planned'
    };
    
    dispatch(addRoute(newRoute));
  };

  const getTrafficColor = (level) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'standard': return 'primary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Optimización de Rutas
      </Typography>

      <Grid container spacing={3}>
        {/* Panel de configuración */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Configuración de Ruta
            </Typography>
            
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Configurar Parámetros</StepLabel>
                <StepContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Tipo de Carga</InputLabel>
                      <Select
                        value={routeParams.cargoType}
                        label="Tipo de Carga"
                        onChange={(e) => handleParamChange('cargoType', e.target.value)}
                      >
                        <MenuItem value="general">General</MenuItem>
                        <MenuItem value="perishable">Perecederos</MenuItem>
                        <MenuItem value="fragile">Frágiles</MenuItem>
                        <MenuItem value="dangerous">Peligrosos</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel>Prioridad</InputLabel>
                      <Select
                        value={routeParams.priority}
                        label="Prioridad"
                        onChange={(e) => handleParamChange('priority', e.target.value)}
                      >
                        <MenuItem value="urgent">Urgente</MenuItem>
                        <MenuItem value="high">Alta</MenuItem>
                        <MenuItem value="standard">Estándar</MenuItem>
                        <MenuItem value="low">Baja</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel>Tipo de Vehículo</InputLabel>
                      <Select
                        value={routeParams.vehicleType}
                        label="Tipo de Vehículo"
                        onChange={(e) => handleParamChange('vehicleType', e.target.value)}
                      >
                        <MenuItem value="truck">Camión</MenuItem>
                        <MenuItem value="trailer">Tractomula</MenuItem>
                        <MenuItem value="bus">Bus</MenuItem>
                        <MenuItem value="train">Tren</MenuItem>
                      </Select>
                    </FormControl>

                    <Typography gutterBottom>
                      Peso máximo: {routeParams.maxWeight} toneladas
                    </Typography>
                    <Slider
                      value={routeParams.maxWeight}
                      onChange={(e, value) => handleParamChange('maxWeight', value)}
                      min={1}
                      max={50}
                      marks
                      valueLabelDisplay="auto"
                    />

                    <Button 
                      variant="contained" 
                      onClick={() => setActiveStep(1)}
                      sx={{ mt: 1 }}
                    >
                      Siguiente
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Seleccionar Restricciones</StepLabel>
                <StepContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={routeParams.timeRestrictions}
                          onChange={(e) => handleParamChange('timeRestrictions', e.target.checked)}
                        />
                      }
                      label="Restricciones horarias"
                    />

                    {routeParams.timeRestrictions && (
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          label="Hora inicio"
                          type="time"
                          value={routeParams.startTime}
                          onChange={(e) => handleParamChange('startTime', e.target.value)}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          label="Hora fin"
                          type="time"
                          value={routeParams.endTime}
                          onChange={(e) => handleParamChange('endTime', e.target.value)}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Box>
                    )}

                    <FormControlLabel
                      control={
                        <Switch
                          checked={routeParams.avoidTolls}
                          onChange={(e) => handleParamChange('avoidTolls', e.target.checked)}
                        />
                      }
                      label="Evitar peajes"
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={routeParams.preferHighways}
                          onChange={(e) => handleParamChange('preferHighways', e.target.checked)}
                        />
                      }
                      label="Preferir autopistas"
                    />

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button onClick={() => setActiveStep(0)}>
                        Atrás
                      </Button>
                      <Button 
                        variant="contained" 
                        onClick={() => setActiveStep(2)}
                      >
                        Siguiente
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Ejecutar Optimización</StepLabel>
                <StepContent>
                  <Box sx={{ mt: 2 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Configuración lista. Haz clic en "Optimizar" para generar las mejores rutas.
                    </Alert>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button onClick={() => setActiveStep(1)}>
                        Atrás
                      </Button>
                      <Button 
                        variant="contained" 
                        onClick={handleOptimize}
                        disabled={routeOptimization.isOptimizing}
                        startIcon={routeOptimization.isOptimizing ? <CircularProgress size={20} /> : <PlayArrow />}
                      >
                        {routeOptimization.isOptimizing ? 'Optimizando...' : 'Optimizar'}
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Revisar Resultados</StepLabel>
                <StepContent>
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Optimización completada. Revisa las opciones de ruta generadas.
                  </Alert>
                </StepContent>
              </Step>
            </Stepper>
          </Paper>

          {/* Lista de rutas activas */}
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Rutas Activas
            </Typography>
            <List>
              {routes.slice(0, 3).map((route, index) => (
                <ListItem key={route.id}>
                  <ListItemIcon>
                    <RouteIcon color={route.status === 'active' ? 'primary' : 'disabled'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {route.estimatedTime} - {route.distance}
                        </Typography>
                        <Chip 
                          label={route.priority} 
                          color={getPriorityColor(route.priority)}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Resultados de optimización */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Rutas Sugeridas
              </Typography>
              <Button
                startIcon={<Refresh />}
                onClick={() => setActiveStep(2)}
                disabled={routeOptimization.isOptimizing}
              >
                Nueva Optimización
              </Button>
            </Box>

            {routeOptimization.isOptimizing ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                <Box textAlign="center">
                  <CircularProgress size={60} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Optimizando rutas...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Analizando tráfico, distancias y restricciones
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {optimizationResults.map((route, index) => (
                  <Grid item xs={12} md={6} key={route.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        border: index === 0 ? '2px solid' : '1px solid',
                        borderColor: index === 0 ? 'success.main' : 'divider'
                      }}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                          <Typography variant="h6">
                            {route.name}
                          </Typography>
                          {index === 0 && (
                            <Chip 
                              label="Recomendada" 
                              color="success" 
                              size="small"
                              icon={<CheckCircle />}
                            />
                          )}
                        </Box>

                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <RouteIcon />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Distancia" 
                              secondary={route.distance}
                            />
                          </ListItem>
                          
                          <ListItem>
                            <ListItemIcon>
                              <AccessTime />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Tiempo estimado" 
                              secondary={route.estimatedTime}
                            />
                          </ListItem>

                          <ListItem>
                            <ListItemIcon>
                              <LocalShipping />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Costo combustible" 
                              secondary={route.fuelCost}
                            />
                          </ListItem>

                          <ListItem>
                            <ListItemIcon>
                              <TrendingUp />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Eficiencia" 
                              secondary={`${route.efficiency}%`}
                            />
                          </ListItem>
                        </List>

                        <Box display="flex" gap={1} mt={2}>
                          <Chip 
                            label={`Tráfico: ${route.trafficLevel}`}
                            color={getTrafficColor(route.trafficLevel)}
                            size="small"
                          />
                          <Chip 
                            label={`Ahorro: ${route.savings}`}
                            color="success"
                            size="small"
                          />
                        </Box>
                      </CardContent>
                      
                      <CardActions>
                        <Button 
                          size="small" 
                          variant="contained"
                          onClick={() => handleApplyRoute(route)}
                        >
                          Aplicar Ruta
                        </Button>
                        <Button size="small">
                          Ver Detalles
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>

          {/* Métricas de optimización */}
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Métricas de Optimización
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="success.main">
                    15%
                  </Typography>
                  <Typography variant="body2">
                    Ahorro promedio en tiempo
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary.main">
                    12%
                  </Typography>
                  <Typography variant="body2">
                    Reducción en combustible
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="warning.main">
                    3
                  </Typography>
                  <Typography variant="body2">
                    Rutas alternativas
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="info.main">
                    89%
                  </Typography>
                  <Typography variant="body2">
                    Precisión del algoritmo
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RouteOptimization;