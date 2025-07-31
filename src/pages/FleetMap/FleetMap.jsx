import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  LocalShipping,
  DirectionsBus,
  Train,
  FilterList,
  Refresh,
  ExpandMore,
  LocationOn,
  Person,
  Build,
  Speed
} from '@mui/icons-material';
import GoogleMap from '../../components/GoogleMap';
import { setSelectedVehicle, setFilters } from '../../store/slices/vehicleSlice';

const FleetMap = () => {
  const dispatch = useDispatch();
  const { selectedVehicle, filters } = useSelector(state => state.vehicles);
  
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [mapCenter] = useState({ lat: 5.7167, lng: -72.9333 }); // Sogamoso

    // Datos de ejemplo para vehículos (ubicados en Sogamoso y alrededores)
  const vehiclesData = [
    {
      id: 1,
      plate: 'ABC-123',
      type: 'truck',
      driver: 'Juan Pérez',
      status: 'active',
      location: { lat: 5.7167, lng: -72.9333 }, // Centro de Sogamoso
      mechanicalStatus: 'Excelente',
      capacity: '5 toneladas',
      currentLoad: '3.2 toneladas'
    },
    {
      id: 2,
      plate: 'DEF-456',
      type: 'bus',
      driver: 'María García',
      status: 'active',
      location: { lat: 5.7200, lng: -72.9300 }, // Norte de Sogamoso
      mechanicalStatus: 'Bueno',
      capacity: '40 pasajeros',
      currentLoad: '28 pasajeros'
    },
    {
      id: 3,
      plate: 'GHI-789',
      type: 'van',
      driver: 'Carlos López',
      status: 'maintenance',
      location: { lat: 5.7100, lng: -72.9400 }, // Sur de Sogamoso
      mechanicalStatus: 'En mantenimiento',
      capacity: '12 pasajeros',
      currentLoad: '0 pasajeros'
    },
    {
      id: 4,
      plate: 'JKL-012',
      type: 'truck',
      driver: 'Ana Rodríguez',
      status: 'active',
      location: { lat: 5.7250, lng: -72.9250 }, // Este de Sogamoso
      mechanicalStatus: 'Bueno',
      capacity: '8 toneladas',
      currentLoad: '6.5 toneladas'
    },
    {
      id: 5,
      plate: 'MNO-345',
      type: 'bus',
      driver: 'Pedro Martínez',
      status: 'inactive',
      location: { lat: 5.7050, lng: -72.9450 }, // Suroeste de Sogamoso
      mechanicalStatus: 'Regular',
      capacity: '35 pasajeros',
      currentLoad: '0 pasajeros'
    },
    {
      id: 6,
      plate: 'PQR-678',
      type: 'van',
      driver: 'Laura Sánchez',
      status: 'active',
      location: { lat: 5.7300, lng: -72.9200 }, // Noreste de Sogamoso
      mechanicalStatus: 'Excelente',
      capacity: '15 pasajeros',
      currentLoad: '8 pasajeros'
    }
  ];

  // Datos de ejemplo para rutas (conectando puntos en Sogamoso)
  const routesData = [
    {
      id: 1,
      name: 'Ruta Centro-Norte',
      type: 'urbana',
      status: 'active',
      origin: { lat: 5.7167, lng: -72.9333 },
      destination: { lat: 5.7250, lng: -72.9250 },
      waypoints: [
        { lat: 5.7200, lng: -72.9300 }
      ],
      distance: '3.2 km',
      estimatedTime: '12 min'
    },
    {
      id: 2,
      name: 'Ruta Sur-Este',
      type: 'intermunicipal',
      status: 'active',
      origin: { lat: 5.7100, lng: -72.9400 },
      destination: { lat: 5.7300, lng: -72.9200 },
      waypoints: [
        { lat: 5.7167, lng: -72.9333 },
        { lat: 5.7200, lng: -72.9280 }
      ],
      distance: '4.8 km',
      estimatedTime: '18 min'
    },
    {
      id: 3,
      name: 'Ruta Carga Industrial',
      type: 'carga',
      status: 'active',
      origin: { lat: 5.7050, lng: -72.9450 },
      destination: { lat: 5.7250, lng: -72.9250 },
      waypoints: [
        { lat: 5.7120, lng: -72.9380 },
        { lat: 5.7180, lng: -72.9320 }
      ],
      distance: '5.5 km',
      estimatedTime: '25 min'
    }
  ];

  // Filtrar vehículos según los filtros aplicados
  const filteredVehicles = vehiclesData.filter(vehicle => {
    if (filters.type !== 'all' && vehicle.type !== filters.type) return false;
    if (filters.status !== 'all' && vehicle.status !== filters.status) return false;
    return true;
  });

  const handleVehicleSelect = (vehicle) => {
    dispatch(setSelectedVehicle(vehicle));
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'truck': return <LocalShipping />;
      case 'bus': return <DirectionsBus />;
      case 'train': return <Train />;
      default: return <LocalShipping />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: 'calc(100vh - 64px)', // Altura total menos la AppBar (64px)
      margin: '-24px', // Compensar el padding del Layout
      width: 'calc(100% + 48px)' // Compensar el padding horizontal del Layout
    }}>
      {/* Panel lateral */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: 350,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 350,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100%'
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Flota de Vehículos</Typography>
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              <FilterList />
            </IconButton>
          </Box>

          {/* Filtros */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tipo de Vehículo</InputLabel>
                  <Select
                    value={filters.type}
                    label="Tipo de Vehículo"
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="truck">Camiones</MenuItem>
                    <MenuItem value="bus">Buses</MenuItem>
                    <MenuItem value="train">Trenes</MenuItem>
                    <MenuItem value="trailer">Tractomulas</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={filters.status}
                    label="Estado"
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="active">Activo</MenuItem>
                    <MenuItem value="inactive">Inactivo</MenuItem>
                    <MenuItem value="maintenance">Mantenimiento</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  size="small"
                  label="Buscar por placa"
                  variant="outlined"
                  fullWidth
                />

                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => dispatch(setFilters({ type: 'all', status: 'all' }))}
                >
                  Limpiar Filtros
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Lista de vehículos */}
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Vehículos ({filteredVehicles.length})
          </Typography>
          
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {filteredVehicles.map((vehicle) => (
              <React.Fragment key={vehicle.id}>
                <ListItem
                  button
                  selected={selectedVehicle?.id === vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  sx={{
                    border: selectedVehicle?.id === vehicle.id ? '2px solid' : '1px solid',
                    borderColor: selectedVehicle?.id === vehicle.id ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  <ListItemIcon>
                    {getVehicleIcon(vehicle.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={vehicle.plate}
                    secondary={vehicle.driver}
                  />
                  <Box>
                    <Chip 
                      label={vehicle.status} 
                      color={getStatusColor(vehicle.status)}
                      size="small"
                    />
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
          </List>

          {/* Detalles del vehículo seleccionado */}
          {selectedVehicle && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Detalles del Vehículo
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box display="flex" alignItems="center">
                    <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">
                      {selectedVehicle.location.lat.toFixed(4)}, {selectedVehicle.location.lng.toFixed(4)}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Person sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">
                      {selectedVehicle.driver}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Build sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">
                      Estado mecánico: {selectedVehicle.mechanicalStatus}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Speed sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">
                      Capacidad: {selectedVehicle.capacity}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Carga actual: {selectedVehicle.currentLoad}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Drawer>

      {/* Mapa */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <GoogleMap
          center={mapCenter}
          zoom={12}
          vehicles={filteredVehicles}
          routes={routesData}
          onVehicleClick={handleVehicleSelect}
          style={{ height: '100%', width: '100%' }}
        />

        {/* Botón para alternar panel */}
        {!drawerOpen && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 1000,
              backgroundColor: 'background.paper',
              '&:hover': { backgroundColor: 'background.paper' }
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <FilterList />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default FleetMap;