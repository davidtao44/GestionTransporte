import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routes: [
    {
      id: 1,
      name: 'Ruta Norte',
      type: 'truck',
      origin: { lat: 4.6097, lng: -74.0817, name: 'Bogotá Centro' },
      destination: { lat: 4.7110, lng: -74.0721, name: 'Zona Norte' },
      waypoints: [
        { lat: 4.6351, lng: -74.0703 },
        { lat: 4.6709, lng: -74.0654 }
      ],
      distance: '25 km',
      estimatedTime: '45 min',
      priority: 'standard',
      cargoType: 'general',
      status: 'active'
    },
    {
      id: 2,
      name: 'Línea TransMilenio',
      type: 'bus',
      origin: { lat: 4.5981, lng: -74.0758, name: 'Portal Sur' },
      destination: { lat: 4.6351, lng: -74.0703, name: 'Centro' },
      waypoints: [
        { lat: 4.6097, lng: -74.0817 },
        { lat: 4.6200, lng: -74.0750 }
      ],
      distance: '15 km',
      estimatedTime: '30 min',
      priority: 'urgent',
      cargoType: 'passengers',
      status: 'active'
    }
  ],
  selectedRoute: null,
  routeOptimization: {
    isOptimizing: false,
    suggestions: []
  }
};

const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },
    addRoute: (state, action) => {
      state.routes.push(action.payload);
    },
    updateRoute: (state, action) => {
      const index = state.routes.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.routes[index] = { ...state.routes[index], ...action.payload };
      }
    },
    setOptimizing: (state, action) => {
      state.routeOptimization.isOptimizing = action.payload;
    },
    setRouteSuggestions: (state, action) => {
      state.routeOptimization.suggestions = action.payload;
    }
  }
});

export const { 
  setSelectedRoute, 
  addRoute, 
  updateRoute, 
  setOptimizing, 
  setRouteSuggestions 
} = routeSlice.actions;

export default routeSlice.reducer;