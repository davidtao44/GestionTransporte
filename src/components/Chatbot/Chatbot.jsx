import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent
} from '@mui/material';
import {
  Chat as ChatIcon,
  Send,
  Close,
  SmartToy,
  Person,
  AttachFile,
  Mic,
  ExpandMore,
  Lightbulb,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { toggleChatbot } from '../../store/slices/uiSlice';

const Chatbot = () => {
  const dispatch = useDispatch();
  const { chatbotOpen } = useSelector(state => state.ui);
  const { vehicles } = useSelector(state => state.vehicles);
  const { routes } = useSelector(state => state.routes);
  const { cargoItems } = useSelector(state => state.cargo);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '¡Hola! Soy tu asistente de gestión de transporte. Puedo ayudarte con consultas sobre vehículos, rutas, optimización y análisis predictivo. ¿En qué puedo asistirte hoy?',
      timestamp: new Date(),
      suggestions: [
        'Estado de la flota',
        'Optimizar rutas',
        'Análisis de eficiencia',
        'Predicciones de demanda'
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedFile) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      file: uploadedFile
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setUploadedFile(null);
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = '';
    let suggestions = [];
    let data = null;

    if (input.includes('flota') || input.includes('vehículo')) {
      const activeVehicles = vehicles.filter(v => v.status === 'active').length;
      const maintenanceVehicles = vehicles.filter(v => v.mechanicalStatus === 'maintenance').length;
      
      response = `📊 **Estado actual de la flota:**\n\n• Vehículos activos: ${activeVehicles}/${vehicles.length}\n• En mantenimiento: ${maintenanceVehicles}\n• Eficiencia promedio: 87%\n\n¿Te gustaría ver detalles específicos de algún vehículo?`;
      suggestions = ['Ver vehículo ABC-123', 'Programar mantenimiento', 'Historial de eficiencia'];
      
      data = {
        type: 'fleet_status',
        vehicles: vehicles.slice(0, 3).map(v => ({
          plate: v.plate,
          status: v.status,
          driver: v.driver,
          mechanicalStatus: v.mechanicalStatus
        }))
      };
    } else if (input.includes('ruta') || input.includes('optimiz')) {
      response = `🛣️ **Análisis de rutas:**\n\nHe identificado 3 oportunidades de optimización:\n\n1. **Ruta Norte**: Posible ahorro de 15 minutos\n2. **Ruta Este**: Reducción de 12% en combustible\n3. **Ruta Sur**: Mejor distribución de carga\n\n¿Quieres que genere rutas optimizadas?`;
      suggestions = ['Optimizar Ruta Norte', 'Ver todas las rutas', 'Análisis de tráfico'];
      
      data = {
        type: 'route_analysis',
        routes: routes.slice(0, 3).map(r => ({
          name: r.name,
          efficiency: Math.floor(Math.random() * 20) + 80,
          savings: Math.floor(Math.random() * 15) + 5
        }))
      };
    } else if (input.includes('eficiencia') || input.includes('rendimiento')) {
      response = `📈 **Análisis de eficiencia:**\n\n• Eficiencia semanal: +3% vs semana anterior\n• Puntualidad: 89% de entregas a tiempo\n• Consumo combustible: -8% optimizado\n• Satisfacción del cliente: 94%\n\nLas mejoras se deben principalmente a la optimización de rutas implementada.`;
      suggestions = ['Ver métricas detalladas', 'Comparar con mes anterior', 'Exportar reporte'];
    } else if (input.includes('predicción') || input.includes('demanda')) {
      response = `🔮 **Predicciones para los próximos 7 días:**\n\n• **Lunes**: Alta demanda en zona norte (8-10 AM)\n• **Miércoles**: Pico de carga en sector industrial\n• **Viernes**: Incremento del 25% en transporte de pasajeros\n\nRecomiendo ajustar la asignación de vehículos según estos patrones.`;
      suggestions = ['Ver predicción detallada', 'Ajustar programación', 'Alertas automáticas'];
    } else if (input.includes('documento') || input.includes('factura')) {
      response = `📄 **Procesamiento de documentos:**\n\nPuedo ayudarte a extraer información de:\n• Facturas y manifiestos\n• Guías de despacho\n• Documentos de carga\n• Reportes de mantenimiento\n\nSube el documento y lo analizaré automáticamente.`;
      suggestions = ['Subir factura', 'Procesar manifiesto', 'Extraer datos de guía'];
    } else if (input.includes('mejor') || input.includes('cuál') || input.includes('cuándo')) {
      response = `💡 **Recomendación inteligente:**\n\nBasado en el análisis de datos históricos:\n\n• **Mejor horario para envíos**: 6:00-8:00 AM (menor tráfico)\n• **Ruta más eficiente**: Autopista Norte (15% más rápida)\n• **Vehículo recomendado**: Camión ABC-123 (mejor rendimiento)\n\n¿Necesitas una recomendación específica?`;
      suggestions = ['Optimizar horario específico', 'Seleccionar vehículo', 'Planificar ruta'];
    } else {
      response = `🤖 Entiendo que necesitas ayuda. Puedo asistirte con:\n\n• **Consultas de estado** de vehículos y rutas\n• **Optimización** de rutas y horarios\n• **Análisis predictivo** de demanda\n• **Procesamiento** de documentos\n• **Recomendaciones** logísticas\n\n¿Sobre qué tema específico te gustaría que te ayude?`;
      suggestions = ['Estado de la flota', 'Optimizar rutas', 'Análisis predictivo', 'Procesar documentos'];
    }

    return {
      id: Date.now(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions,
      data
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {/* Botón flotante */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1300
        }}
        onClick={() => dispatch(toggleChatbot())}
      >
        <ChatIcon />
      </Fab>

      {/* Dialog del chatbot */}
      <Dialog
        open={chatbotOpen}
        onClose={() => dispatch(toggleChatbot())}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { height: '80vh', maxHeight: '600px' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              <SmartToy />
            </Avatar>
            <Box>
              <Typography variant="h6">Asistente IA - GestiónTransporte</Typography>
              <Typography variant="caption" color="text.secondary">
                Powered by Gemini AI
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => dispatch(toggleChatbot())}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Lista de mensajes */}
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <List>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <ListItem
                    sx={{
                      flexDirection: 'column',
                      alignItems: message.type === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                        maxWidth: '80%'
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: message.type === 'user' ? 'secondary.main' : 'primary.main',
                          mx: 1
                        }}
                      >
                        {message.type === 'user' ? <Person /> : <SmartToy />}
                      </Avatar>
                      
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: message.type === 'user' ? 'primary.light' : 'grey.100',
                          color: message.type === 'user' ? 'white' : 'text.primary'
                        }}
                      >
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                          {message.content}
                        </Typography>
                        
                        {message.file && (
                          <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                            <Typography variant="caption">
                              📎 {message.file.name} ({formatFileSize(message.file.size)})
                            </Typography>
                          </Box>
                        )}
                        
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                          {message.timestamp.toLocaleTimeString()}
                        </Typography>
                      </Paper>
                    </Box>

                    {/* Datos estructurados */}
                    {message.data && (
                      <Box sx={{ mt: 1, width: '100%', maxWidth: '80%' }}>
                        {message.data.type === 'fleet_status' && (
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle2" gutterBottom>
                                Estado de Vehículos
                              </Typography>
                              {message.data.vehicles.map((vehicle, index) => (
                                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                  <Typography variant="body2">{vehicle.plate}</Typography>
                                  <Chip 
                                    label={vehicle.status} 
                                    color={vehicle.status === 'active' ? 'success' : 'default'}
                                    size="small"
                                  />
                                </Box>
                              ))}
                            </CardContent>
                          </Card>
                        )}
                        
                        {message.data.type === 'route_analysis' && (
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle2" gutterBottom>
                                Análisis de Rutas
                              </Typography>
                              {message.data.routes.map((route, index) => (
                                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                  <Typography variant="body2">{route.name}</Typography>
                                  <Box>
                                    <Chip 
                                      label={`${route.efficiency}% eficiencia`}
                                      color="primary"
                                      size="small"
                                      sx={{ mr: 1 }}
                                    />
                                    <Chip 
                                      label={`${route.savings}% ahorro`}
                                      color="success"
                                      size="small"
                                    />
                                  </Box>
                                </Box>
                              ))}
                            </CardContent>
                          </Card>
                        )}
                      </Box>
                    )}

                    {/* Sugerencias */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: '80%' }}>
                        {message.suggestions.map((suggestion, index) => (
                          <Chip
                            key={index}
                            label={suggestion}
                            variant="outlined"
                            size="small"
                            onClick={() => handleSuggestionClick(suggestion)}
                            sx={{ cursor: 'pointer' }}
                          />
                        ))}
                      </Box>
                    )}
                  </ListItem>
                </React.Fragment>
              ))}
              
              {isTyping && (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <SmartToy />
                    </Avatar>
                  </ListItemAvatar>
                  <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                    <Box display="flex" alignItems="center">
                      <CircularProgress size={16} sx={{ mr: 1 }} />
                      <Typography variant="body2">El asistente está escribiendo...</Typography>
                    </Box>
                  </Paper>
                </ListItem>
              )}
              
              <div ref={messagesEndRef} />
            </List>
          </Box>

          <Divider />

          {/* Archivo subido */}
          {uploadedFile && (
            <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Alert 
                severity="info" 
                onClose={() => setUploadedFile(null)}
                sx={{ mb: 1 }}
              >
                Archivo seleccionado: {uploadedFile.name} ({formatFileSize(uploadedFile.size)})
              </Alert>
            </Box>
          )}

          {/* Input de mensaje */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            />
            
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              size="small"
            >
              <AttachFile />
            </IconButton>
            
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Escribe tu consulta aquí..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
            />
            
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() && !uploadedFile}
            >
              <Send />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;