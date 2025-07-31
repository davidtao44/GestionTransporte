import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [
    {
      id: 1,
      type: 'truck',
      plate: 'ABC-123',
      driver: 'Juan Pérez',
      status: 'active',
      location: { lat: 4.6097, lng: -74.0817 },
      mechanicalStatus: 'good',
      capacity: '10 tons',
      currentLoad: '7.5 tons'
    },
    {
      id: 2,
      type: 'bus',
      plate: 'DEF-456',
      driver: 'María García',
      status: 'active',
      location: { lat: 4.6351, lng: -74.0703 },
      mechanicalStatus: 'maintenance',
      capacity: '40 passengers',
      currentLoad: '25 passengers'
    },
    {
      id: 3,
      type: 'train',
      plate: 'TRN-789',
      driver: 'Carlos López',
      status: 'inactive',
      location: { lat: 4.5981, lng: -74.0758 },
      mechanicalStatus: 'good',
      capacity: '200 tons',
      currentLoad: '150 tons'
    }
  ],
  selectedVehicle: null,
  filters: {
    type: 'all',
    status: 'all',
    location: 'all'
  }
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    updateVehicleLocation: (state, action) => {
      const { id, location } = action.payload;
      const vehicle = state.vehicles.find(v => v.id === id);
      if (vehicle) {
        vehicle.location = location;
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addVehicle: (state, action) => {
      state.vehicles.push(action.payload);
    },
    updateVehicle: (state, action) => {
      const index = state.vehicles.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.vehicles[index] = { ...state.vehicles[index], ...action.payload };
      }
    }
  }
});

export const { 
  setSelectedVehicle, 
  updateVehicleLocation, 
  setFilters, 
  addVehicle, 
  updateVehicle 
} = vehicleSlice.actions;

export default vehicleSlice.reducer;