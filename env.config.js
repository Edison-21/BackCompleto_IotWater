export const ENV = {
  // Configuración de Base de Datos PostgreSQL
  POSTGRES_HOST: "localhost",
  POSTGRES_PORT: 5432,
  POSTGRES_USER: "postgres",
  POSTGRES_PASSWORD: "1234",
  POSTGRES_DATABASE: "iot_water",

  // Configuración de Base de Datos MongoDB
  MONGO_URL: "mongodb://localhost:27017/iot_water_logs",
  MONGO_AUTH_SOURCE: "admin",

  // Clave de Cifrado para Datos Personales
  ENCRYPTION_KEY: "your-super-secret-encryption-key-32-chars",

  // Configuración JWT
  JWT_SECRET: "your-jwt-secret-key",
  JWT_EXPIRES_IN: "15m",
  JWT_REFRESH_SECRET: "your-jwt-refresh-secret-key",
  JWT_REFRESH_EXPIRES_IN: "7d",

  // Configuración del Servidor
  PORT: 3000,
  NODE_ENV: "development",

  // Configuración de Swagger
  SWAGGER_TITLE: "Sistema IoT de Gestión de Agua",
  SWAGGER_DESCRIPTION: "API para gestión de dispositivos IoT, clientes, denuncias y eficiencia hídrica",
  SWAGGER_VERSION: "1.0",
  SWAGGER_PATH: "api-docs",
};
