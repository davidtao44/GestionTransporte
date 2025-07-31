import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  sidebarOpen: true,
  chatbotOpen: false,
  notifications: [
    {
      id: 1,
      type: 'warning',
      message: 'Vehículo DEF-456 requiere mantenimiento',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Nueva ruta optimizada disponible',
      timestamp: new Date().toISOString(),
      read: false
    }
  ],
  alerts: [
    {
      id: 1,
      severity: 'high',
      message: 'Retraso en ruta Norte - Tráfico pesado',
      vehicleId: 1,
      timestamp: new Date().toISOString()
    }
  ],
  loading: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleChatbot: (state) => {
      state.chatbotOpen = !state.chatbotOpen;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    addAlert: (state, action) => {
      state.alerts.unshift(action.payload);
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { 
  toggleTheme, 
  toggleSidebar, 
  toggleChatbot, 
  addNotification, 
  markNotificationAsRead, 
  addAlert, 
  removeAlert, 
  setLoading 
} = uiSlice.actions;

export default uiSlice.reducer;