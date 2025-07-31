import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cargoItems: [
    {
      id: 1,
      type: 'perishable',
      weight: '5.2 tons',
      volume: '12 m³',
      description: 'Productos lácteos',
      priority: 'urgent',
      vehicleId: 1,
      documents: ['manifest_001.pdf', 'invoice_001.pdf'],
      photos: ['cargo_001.jpg'],
      fillLevel: 75
    },
    {
      id: 2,
      type: 'fragile',
      weight: '2.1 tons',
      volume: '8 m³',
      description: 'Equipos electrónicos',
      priority: 'standard',
      vehicleId: 1,
      documents: ['manifest_002.pdf'],
      photos: ['cargo_002.jpg'],
      fillLevel: 45
    }
  ],
  passengerData: [
    {
      id: 1,
      routeId: 2,
      vehicleId: 2,
      occupancy: 25,
      maxCapacity: 40,
      timestamp: new Date().toISOString(),
      paymentIntegration: {
        totalFare: 125000,
        paymentMethods: ['card', 'cash', 'digital']
      }
    }
  ],
  demandHeatmap: [
    { lat: 4.6097, lng: -74.0817, intensity: 0.8, hour: 7 },
    { lat: 4.6351, lng: -74.0703, intensity: 0.9, hour: 8 },
    { lat: 4.5981, lng: -74.0758, intensity: 0.6, hour: 9 }
  ]
};

const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {
    addCargoItem: (state, action) => {
      state.cargoItems.push(action.payload);
    },
    updateCargoItem: (state, action) => {
      const index = state.cargoItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.cargoItems[index] = { ...state.cargoItems[index], ...action.payload };
      }
    },
    updatePassengerData: (state, action) => {
      const index = state.passengerData.findIndex(data => data.id === action.payload.id);
      if (index !== -1) {
        state.passengerData[index] = { ...state.passengerData[index], ...action.payload };
      } else {
        state.passengerData.push(action.payload);
      }
    },
    updateDemandHeatmap: (state, action) => {
      state.demandHeatmap = action.payload;
    }
  }
});

export const { 
  addCargoItem, 
  updateCargoItem, 
  updatePassengerData, 
  updateDemandHeatmap 
} = cargoSlice.actions;

export default cargoSlice.reducer;