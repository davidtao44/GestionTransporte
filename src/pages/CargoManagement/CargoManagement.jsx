import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Avatar,
  Divider,
  Alert
} from '@mui/material';
import {
  LocalShipping,
  People,
  Add,
  Edit,
  Visibility,
  CloudUpload,
  Description,
  Photo,
  Payment,
  CreditCard,
  AccountBalance
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { addCargoItem, updateCargoItem, updatePassengerData } from '../../store/slices/cargoSlice';

const CargoManagement = () => {
  const dispatch = useDispatch();
  const { cargoItems, passengerData, demandHeatmap } = useSelector(state => state.cargo);
  const { vehicles } = useSelector(state => state.vehicles);
  
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newCargoForm, setNewCargoForm] = useState({
    type: 'general',
    weight: '',
    volume: '',
    description: '',
    priority: 'standard',
    vehicleId: '',
    documents: [],
    photos: []
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddCargo = () => {
    setSelectedItem(null);
    setNewCargoForm({
      type: 'general',
      weight: '',
      volume: '',
      description: '',
      priority: 'standard',
      vehicleId: '',
      documents: [],
      photos: []
    });
    setDialogOpen(true);
  };

  const handleEditCargo = (item) => {
    setSelectedItem(item);
    setNewCargoForm({
      type: item.type,
      weight: item.weight,
      volume: item.volume,
      description: item.description,
      priority: item.priority,
      vehicleId: item.vehicleId,
      documents: item.documents || [],
      photos: item.photos || []
    });
    setDialogOpen(true);
  };

  const handleSaveCargo = () => {
    const cargoData = {
      ...newCargoForm,
      id: selectedItem ? selectedItem.id : Date.now(),
      fillLevel: Math.floor(Math.random() * 100)
    };

    if (selectedItem) {
      dispatch(updateCargoItem(cargoData));
    } else {
      dispatch(addCargoItem(cargoData));
    }
    
    setDialogOpen(false);
  };

  const onDrop = (acceptedFiles, fileType) => {
    const fileNames = acceptedFiles.map(file => file.name);
    setNewCargoForm(prev => ({
      ...prev,
      [fileType]: [...prev[fileType], ...fileNames]
    }));
  };

  const { getRootProps: getDocRootProps, getInputProps: getDocInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'documents'),
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'photos'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const getCargoTypeColor = (type) => {
    switch (type) {
      case 'perishable': return 'warning';
      case 'fragile': return 'error';
      case 'dangerous': return 'error';
      default: return 'primary';
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

  const CargoTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Gestión de Carga</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddCargo}
        >
          Agregar Carga
        </Button>
      </Box>

      <Grid container spacing={3}>
        {cargoItems.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Typography variant="h6" gutterBottom>
                    {item.description}
                  </Typography>
                  <Chip 
                    label={item.type} 
                    color={getCargoTypeColor(item.type)}
                    size="small"
                  />
                </Box>

                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Peso" 
                      secondary={item.weight}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Volumen" 
                      secondary={item.volume}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Vehículo asignado" 
                      secondary={vehicles.find(v => v.id === item.vehicleId)?.plate || 'No asignado'}
                    />
                  </ListItem>
                </List>

                <Box mt={2}>
                  <Typography variant="body2" gutterBottom>
                    Nivel de llenado: {item.fillLevel}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.fillLevel} 
                    color={item.fillLevel > 80 ? 'success' : 'primary'}
                  />
                </Box>

                <Box display="flex" gap={1} mt={2}>
                  <Chip 
                    label={item.priority} 
                    color={getPriorityColor(item.priority)}
                    size="small"
                  />
                  {item.documents && item.documents.length > 0 && (
                    <Chip 
                      icon={<Description />}
                      label={`${item.documents.length} docs`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {item.photos && item.photos.length > 0 && (
                    <Chip 
                      icon={<Photo />}
                      label={`${item.photos.length} fotos`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </CardContent>
              
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<Edit />}
                  onClick={() => handleEditCargo(item)}
                >
                  Editar
                </Button>
                <Button 
                  size="small" 
                  startIcon={<Visibility />}
                >
                  Ver Detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const PassengerTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Control de Pasajeros
      </Typography>

      <Grid container spacing={3}>
        {/* Ocupación en tiempo real */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ocupación en Tiempo Real
            </Typography>
            {passengerData.map((data) => {
              const vehicle = vehicles.find(v => v.id === data.vehicleId);
              const occupancyPercentage = (data.occupancy / data.maxCapacity) * 100;
              
              return (
                <Card key={data.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="subtitle1">
                        {vehicle?.plate} - {vehicle?.driver}
                      </Typography>
                      <Chip 
                        label={`${data.occupancy}/${data.maxCapacity}`}
                        color={occupancyPercentage > 80 ? 'error' : occupancyPercentage > 60 ? 'warning' : 'success'}
                      />
                    </Box>
                    
                    <Typography variant="body2" gutterBottom>
                      Ocupación: {occupancyPercentage.toFixed(1)}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={occupancyPercentage}
                      color={occupancyPercentage > 80 ? 'error' : occupancyPercentage > 60 ? 'warning' : 'success'}
                    />
                    
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Última actualización: {new Date(data.timestamp).toLocaleTimeString()}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Paper>
        </Grid>

        {/* Integración de pagos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Integración de Pagos
            </Typography>
            {passengerData.map((data) => (
              <Card key={`payment-${data.id}`} sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1">
                      Recaudo Total
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      ${data.paymentIntegration.totalFare.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" gutterBottom>
                    Métodos de pago aceptados:
                  </Typography>
                  <Box display="flex" gap={1} mt={1}>
                    {data.paymentIntegration.paymentMethods.map((method) => (
                      <Chip
                        key={method}
                        icon={
                          method === 'card' ? <CreditCard /> :
                          method === 'digital' ? <AccountBalance /> :
                          <Payment />
                        }
                        label={method === 'card' ? 'Tarjeta' : method === 'digital' ? 'Digital' : 'Efectivo'}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Heatmap de demanda */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Análisis de Demanda por Ubicación
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ubicación</TableCell>
                    <TableCell>Hora Pico</TableCell>
                    <TableCell>Intensidad</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {demandHeatmap.map((point, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                      </TableCell>
                      <TableCell>{point.hour}:00</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <LinearProgress 
                            variant="determinate" 
                            value={point.intensity * 100}
                            sx={{ width: 100, mr: 1 }}
                            color={point.intensity > 0.7 ? 'error' : point.intensity > 0.5 ? 'warning' : 'success'}
                          />
                          {(point.intensity * 100).toFixed(0)}%
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={point.intensity > 0.7 ? 'Alta' : point.intensity > 0.5 ? 'Media' : 'Baja'}
                          color={point.intensity > 0.7 ? 'error' : point.intensity > 0.5 ? 'warning' : 'success'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Control de Carga y Pasajeros
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab 
            icon={<LocalShipping />} 
            label="Gestión de Carga" 
            iconPosition="start"
          />
          <Tab 
            icon={<People />} 
            label="Control de Pasajeros" 
            iconPosition="start"
          />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && <CargoTab />}
          {tabValue === 1 && <PassengerTab />}
        </Box>
      </Paper>

      {/* Dialog para agregar/editar carga */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedItem ? 'Editar Carga' : 'Agregar Nueva Carga'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Carga</InputLabel>
                <Select
                  value={newCargoForm.type}
                  label="Tipo de Carga"
                  onChange={(e) => setNewCargoForm(prev => ({ ...prev, type: e.target.value }))}
                >
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="perishable">Perecederos</MenuItem>
                  <MenuItem value="fragile">Frágiles</MenuItem>
                  <MenuItem value="dangerous">Peligrosos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Prioridad</InputLabel>
                <Select
                  value={newCargoForm.priority}
                  label="Prioridad"
                  onChange={(e) => setNewCargoForm(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <MenuItem value="urgent">Urgente</MenuItem>
                  <MenuItem value="high">Alta</MenuItem>
                  <MenuItem value="standard">Estándar</MenuItem>
                  <MenuItem value="low">Baja</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Peso"
                value={newCargoForm.weight}
                onChange={(e) => setNewCargoForm(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="ej: 5.2 tons"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Volumen"
                value={newCargoForm.volume}
                onChange={(e) => setNewCargoForm(prev => ({ ...prev, volume: e.target.value }))}
                placeholder="ej: 12 m³"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                value={newCargoForm.description}
                onChange={(e) => setNewCargoForm(prev => ({ ...prev, description: e.target.value }))}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Vehículo Asignado</InputLabel>
                <Select
                  value={newCargoForm.vehicleId}
                  label="Vehículo Asignado"
                  onChange={(e) => setNewCargoForm(prev => ({ ...prev, vehicleId: e.target.value }))}
                >
                  {vehicles.map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.plate} - {vehicle.driver} ({vehicle.type})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Zona de carga de documentos */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Documentos
              </Typography>
              <Box
                {...getDocRootProps()}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 1,
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' }
                }}
              >
                <input {...getDocInputProps()} />
                <CloudUpload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2">
                  Arrastra documentos aquí o haz clic para seleccionar
                </Typography>
              </Box>
              {newCargoForm.documents.length > 0 && (
                <List dense>
                  {newCargoForm.documents.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Description />
                      </ListItemIcon>
                      <ListItemText primary={doc} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>

            {/* Zona de carga de fotos */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Fotografías
              </Typography>
              <Box
                {...getPhotoRootProps()}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 1,
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' }
                }}
              >
                <input {...getPhotoInputProps()} />
                <Photo sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2">
                  Arrastra fotos aquí o haz clic para seleccionar
                </Typography>
              </Box>
              {newCargoForm.photos.length > 0 && (
                <List dense>
                  {newCargoForm.photos.map((photo, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Photo />
                      </ListItemIcon>
                      <ListItemText primary={photo} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveCargo} variant="contained">
            {selectedItem ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CargoManagement;