import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { LocationOn, LocalShipping, Route } from '@mui/icons-material';

const GoogleMap = ({ vehicles = [], routes = [], onVehicleClick, style = { height: '100%', width: '100%' } }) => {
  // Función para obtener color del vehículo según su estado
  const getVehicleColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'inactive': return '#F44336';
      case 'maintenance': return '#FF9800';
      default: return '#2196F3';
    }
  };

  // Función para obtener color de la ruta
  const getRouteColor = (index) => {
    const colors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#F44336'];
    return colors[index % colors.length];
  };

  return (
    <Box sx={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {/* Mapa simulado con SVG */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        style={{ 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          border: '2px solid #1976d2',
          borderRadius: '8px'
        }}
      >
        {/* Fondo del mapa con patrón de calles */}
        <defs>
          <pattern id="streets" patternUnits="userSpaceOnUse" width="40" height="40">
            <rect width="40" height="40" fill="#f5f5f5"/>
            <path d="M 0,20 l 40,0 M 20,0 l 0,40" stroke="#e0e0e0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#streets)" opacity="0.3"/>

        {/* Rutas simuladas */}
        {routes.map((route, index) => (
          <g key={route.id || index}>
            {/* Línea de ruta */}
            <path
              d={`M ${100 + index * 150} 100 Q ${200 + index * 150} 200 ${300 + index * 150} 300 Q ${400 + index * 150} 400 ${500 + index * 150} 500`}
              stroke={getRouteColor(index)}
              strokeWidth="4"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.8"
            />
            {/* Etiqueta de ruta */}
            <text
              x={150 + index * 150}
              y={120}
              fill={getRouteColor(index)}
              fontSize="12"
              fontWeight="bold"
            >
              {route.name || `Ruta ${index + 1}`}
            </text>
          </g>
        ))}

        {/* Vehículos simulados */}
        {vehicles.map((vehicle, index) => {
          const x = 150 + (index % 5) * 120;
          const y = 150 + Math.floor(index / 5) * 100;
          
          return (
            <g 
              key={vehicle.id || index}
              style={{ cursor: 'pointer' }}
              onClick={() => onVehicleClick && onVehicleClick(vehicle)}
            >
              {/* Círculo del vehículo */}
              <circle
                cx={x}
                cy={y}
                r="12"
                fill={getVehicleColor(vehicle.status)}
                stroke="#ffffff"
                strokeWidth="3"
                opacity="0.9"
              />
              {/* Ícono de camión */}
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                🚛
              </text>
              {/* Etiqueta del vehículo */}
              <text
                x={x}
                y={y + 30}
                textAnchor="middle"
                fill="#333"
                fontSize="10"
                fontWeight="bold"
              >
                {vehicle.plate || `V${index + 1}`}
              </text>
            </g>
          );
        })}

        {/* Puntos de interés simulados */}
        <g>
          {/* Almacén principal */}
          <rect x="50" y="50" width="30" height="20" fill="#795548" rx="3"/>
          <text x="65" y="80" textAnchor="middle" fontSize="10" fill="#333">Almacén</text>
          
          {/* Centros de distribución */}
          <circle cx="700" cy="150" r="8" fill="#FF5722"/>
          <text x="700" y="170" textAnchor="middle" fontSize="10" fill="#333">CD Norte</text>
          
          <circle cx="650" cy="450" r="8" fill="#FF5722"/>
          <text x="650" y="470" textAnchor="middle" fontSize="10" fill="#333">CD Sur</text>
          
          <circle cx="200" cy="500" r="8" fill="#FF5722"/>
          <text x="200" y="520" textAnchor="middle" fontSize="10" fill="#333">CD Este</text>
        </g>

        {/* Título del mapa */}
        <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1976d2">
          Mapa de Flota - Vista Simulada
        </text>
      </svg>

      {/* Leyenda */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
          minWidth: 200
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
          Leyenda
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#4CAF50' }} />
            <Typography variant="caption">Activo</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F44336' }} />
            <Typography variant="caption">Inactivo</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF9800' }} />
            <Typography variant="caption">Mantenimiento</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Route sx={{ fontSize: 12, color: '#2196F3' }} />
            <Typography variant="caption">Rutas</Typography>
          </Box>
        </Box>
      </Box>

      {/* Información de estado */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap'
        }}
      >
        <Chip
          icon={<LocalShipping />}
          label={`${vehicles.length} Vehículos`}
          size="small"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<Route />}
          label={`${routes.length} Rutas`}
          size="small"
          color="secondary"
          variant="outlined"
        />
        <Chip
          label={`${vehicles.filter(v => v.status === 'active').length} Activos`}
          size="small"
          sx={{ backgroundColor: '#4CAF50', color: 'white' }}
        />
      </Box>
    </Box>
  );
};

export default GoogleMap;