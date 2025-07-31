import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tabs,
  Tab,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Download,
  Print,
  Share,
  Assessment,
  TrendingUp,
  ShowChart,
  Visibility,
  GetApp
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Reports = () => {
  const { vehicles } = useSelector(state => state.vehicles);
  
  const [activeTab, setActiveTab] = useState(0);
  const [reportType, setReportType] = useState('efficiency');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Datos simulados para reportes
  const efficiencyData = [
    { month: 'Ene', efficiency: 85, fuel: 120, maintenance: 15 },
    { month: 'Feb', efficiency: 88, fuel: 115, maintenance: 12 },
    { month: 'Mar', efficiency: 92, fuel: 108, maintenance: 8 },
    { month: 'Apr', efficiency: 87, fuel: 118, maintenance: 14 },
    { month: 'May', efficiency: 94, fuel: 105, maintenance: 6 },
    { month: 'Jun', efficiency: 91, fuel: 110, maintenance: 9 }
  ];

  const vehicleTypeData = [
    { name: 'Camiones', value: 35, color: '#8884d8' },
    { name: 'Tractomulas', value: 25, color: '#82ca9d' },
    { name: 'Buses', value: 30, color: '#ffc658' },
    { name: 'Trenes', value: 10, color: '#ff7300' }
  ];

  const routePerformanceData = [
    { route: 'Ruta Norte', onTime: 89, delayed: 11, efficiency: 92 },
    { route: 'Ruta Sur', onTime: 94, delayed: 6, efficiency: 88 },
    { route: 'Ruta Este', onTime: 87, delayed: 13, efficiency: 85 },
    { route: 'Ruta Oeste', onTime: 91, delayed: 9, efficiency: 90 },
    { route: 'Ruta Centro', onTime: 85, delayed: 15, efficiency: 83 }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleExportReport = (format) => {
    console.log(`Exportando reporte en formato: ${format}`);
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sistema de Reportes
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Genera reportes personalizados y análisis detallados del sistema de transporte
      </Typography>

      {/* Filtros y configuración */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Configuración del Reporte
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Reporte</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Tipo de Reporte"
                >
                  <MenuItem value="efficiency">Eficiencia Operacional</MenuItem>
                  <MenuItem value="financial">Análisis Financiero</MenuItem>
                  <MenuItem value="performance">Rendimiento de Rutas</MenuItem>
                  <MenuItem value="maintenance">Mantenimiento</MenuItem>
                  <MenuItem value="fuel">Consumo de Combustible</MenuItem>
                  <MenuItem value="custom">Personalizado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                label="Fecha Inicio"
                type="date"
                value={dateRange.start.toISOString().split('T')[0]}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                label="Fecha Fin"
                type="date"
                value={dateRange.end.toISOString().split('T')[0]}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleGenerateReport}
                disabled={isGenerating}
                startIcon={<Assessment />}
                sx={{ height: '56px' }}
              >
                {isGenerating ? 'Generando...' : 'Generar Reporte'}
              </Button>
            </Grid>
          </Grid>

          {isGenerating && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Procesando datos y generando visualizaciones...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Tabs de reportes */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
             <Tab label="Resumen Ejecutivo" icon={<Assessment />} />
             <Tab label="Análisis de Eficiencia" icon={<TrendingUp />} />
             <Tab label="Rendimiento por Rutas" icon={<ShowChart />} />
           </Tabs>
        </Box>

        {/* Panel 1: Resumen Ejecutivo */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Resumen ejecutivo del período: {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
              </Alert>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">94%</Typography>
                  <Typography variant="body2">Eficiencia General</Typography>
                  <Chip label="+3% vs mes anterior" color="success" size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">89%</Typography>
                  <Typography variant="body2">Puntualidad</Typography>
                  <Chip label="+1% vs mes anterior" color="success" size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">$129K</Typography>
                  <Typography variant="body2">Costos Totales</Typography>
                  <Chip label="-8% vs mes anterior" color="success" size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">2.1M</Typography>
                  <Typography variant="body2">Km Recorridos</Typography>
                  <Chip label="+12% vs mes anterior" color="primary" size="small" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Tendencia de Eficiencia</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="efficiency" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Distribución de Flota</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={vehicleTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {vehicleTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Panel 2: Análisis de Eficiencia */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Métricas de Eficiencia por Mes</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Eficiencia %" />
                      <Line type="monotone" dataKey="fuel" stroke="#82ca9d" name="Consumo Combustible" />
                      <Line type="monotone" dataKey="maintenance" stroke="#ffc658" name="Horas Mantenimiento" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Vehículo</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Eficiencia</TableCell>
                      <TableCell>Km Recorridos</TableCell>
                      <TableCell>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicles.slice(0, 5).map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>{vehicle.plate}</TableCell>
                        <TableCell>{vehicle.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={`${Math.floor(Math.random() * 20) + 80}%`}
                            color={Math.random() > 0.3 ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{(Math.random() * 50000 + 10000).toFixed(0)} km</TableCell>
                        <TableCell>
                          <Chip 
                            label={vehicle.status}
                            color={vehicle.status === 'active' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Panel 3: Rendimiento por Rutas */}
        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Rendimiento de Rutas</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsBarChart data={routePerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="route" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="onTime" fill="#8884d8" name="A Tiempo %" />
                      <Bar dataKey="efficiency" fill="#82ca9d" name="Eficiencia %" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ruta</TableCell>
                      <TableCell>Entregas a Tiempo</TableCell>
                      <TableCell>Retrasos</TableCell>
                      <TableCell>Eficiencia</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {routePerformanceData.map((route, index) => (
                      <TableRow key={index}>
                        <TableCell>{route.route}</TableCell>
                        <TableCell>
                          <Chip label={`${route.onTime}%`} color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label={`${route.delayed}%`} color="error" size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${route.efficiency}%`}
                            color={route.efficiency > 85 ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* Botones de acción */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<Print />}
          onClick={() => window.print()}
        >
          Imprimir
        </Button>
        <Button
          variant="outlined"
          startIcon={<Share />}
          onClick={() => handleExportReport('share')}
        >
          Compartir
        </Button>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={() => handleExportReport('download')}
        >
          Descargar Reporte
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;