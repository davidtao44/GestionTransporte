import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './slices/vehicleSlice';
import routeReducer from './slices/routeSlice';
import cargoReducer from './slices/cargoSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    routes: routeReducer,
    cargo: cargoReducer,
    ui: uiReducer,
  },
});

export default store;