# Esquema de Base de Datos - Sistema IoT de Agua

## Descripción General

Este documento describe el esquema completo de la base de datos para el sistema IoT de gestión de agua. El sistema está diseñado para manejar dispositivos LoRaWAN, gestión de clientes, denuncias ciudadanas, incidentes técnicos y análisis de eficiencia hídrica.

## Características de Seguridad

- **Cifrado de Datos Personales**: Todos los datos personales (nombres, apellidos, emails, teléfonos, direcciones) están cifrados usando AES-256 con crypto-js
- **Clave de Cifrado**: Configurada a través de la variable de entorno `ENCRYPTION_KEY`
- **Hooks Automáticos**: El cifrado se aplica automáticamente antes de insertar/actualizar registros

## Módulos del Sistema

### I. Módulo Core / Fundamentales

#### 1. Usuarios (`usuarios`)
Tabla maestra para todo el personal y agentes del sistema.

**Campos principales:**
- `idUsuario` (PK): Identificador único del usuario
- `idEmpleado` (Único): ID del empleado
- `nombre`, `apellido`: Datos personales (CIFRADOS)
- `email` (Único): Email del usuario (CIFRADO)
- `telefono`: Teléfono (CIFRADO)
- `idDepartamento` (FK): Referencia al departamento
- `estado`: Estado del usuario (Activo, Inactivo, Suspendido, Vacaciones)
- `passwordHash`: Hash de la contraseña

**Relaciones:**
- Pertenece a un `Departamento`
- Tiene múltiples `Roles` (a través de `usuario_roles`)
- Genera múltiples `RegistroActividadUsuario`

#### 2. Departamentos (`departamentos`)
Catálogo para organizar el personal y asignaciones.

**Campos principales:**
- `idDepartamento` (PK): Identificador único
- `nombreDepartamento`: Nombre del departamento
- `descripcion`: Descripción del departamento

#### 3. Roles (`roles`)
Define los tipos de usuarios y sus permisos.

**Campos principales:**
- `idRol` (PK): Identificador único
- `nombreRol`: Nombre del rol
- `nivelAccesoGeneral`: Nivel de acceso general

#### 4. Permisos (`permisos`)
Detalle de funciones del sistema.

**Campos principales:**
- `idPermiso` (PK): Identificador único
- `nombrePermiso`: Nombre del permiso
- `descripcion`: Descripción del permiso

#### 5. UsuarioRoles (`usuario_roles`)
Tabla intermedia para asignar roles a usuarios.

#### 6. RolPermisos (`rol_permisos`)
Tabla intermedia para asignar permisos a roles.

#### 7. RegistroActividadUsuario (`registro_actividad_usuario`)
Log de acciones de los usuarios.

### II. Módulo de Gestión de Dispositivos LoRaWAN

#### 1. Gateways (`gateways`)
Dispositivos de red LoRaWAN.

**Campos principales:**
- `idGateway` (PK): Identificador único
- `numeroSerie` (Único): Número de serie del gateway
- `nombre`: Nombre del gateway
- `ubicacion`: Ubicación física
- `latitud`, `longitud`: Coordenadas GPS
- `estado`: Estado del gateway (Online, Offline, Falla, En Mantenimiento)
- `ultimaComunicacion`: Última comunicación registrada

#### 2. Dispositivos (`dispositivos`)
Medidores, válvulas y sensores.

**Campos principales:**
- `idDispositivo` (PK): Identificador único
- `numeroSerie` (Único): Número de serie del dispositivo
- `tipo`: Tipo de dispositivo (Medidor, Válvula, Sensor)
- `estadoOperacional`: Estado operacional del dispositivo
- `nivelBateria`: Nivel de batería (0-100%)
- `ultimaComunicacion`: Última comunicación
- `configuracionPersonalizada`: Configuración en formato JSONB

**Relaciones:**
- Pertenece a un `Gateway`
- Asociado a un `Cliente` (opcional)
- Ubicado en un `Sector`
- Genera múltiples `DatosConsumoAgua`

#### 3. DatosConsumoAgua (`datos_consumo_agua`)
Lecturas de medidores (serie de tiempo).

**Campos principales:**
- `idLectura` (PK): Identificador único
- `idDispositivo` (FK): Referencia al dispositivo
- `timestamp`: Fecha y hora de la lectura
- `consumoM3`: Consumo en metros cúbicos
- `estadoLectura`: Estado de la lectura (Normal, Anomalía, Missing)

#### 4. MantenimientosDispositivo (`mantenimientos_dispositivo`)
Historial de mantenimientos de dispositivos.

**Campos principales:**
- `idMantenimiento` (PK): Identificador único
- `idDispositivo` (FK): Referencia al dispositivo
- `tipoMantenimiento`: Tipo de mantenimiento
- `fechaMantenimiento`: Fecha del mantenimiento
- `realizadoPorUsuario` (FK): Usuario que realizó el mantenimiento

#### 5. LogsTecnicosDispositivo (`logs_tecnicos_dispositivo`)
Registros de actividad y eventos técnicos.

**Campos principales:**
- `idLog` (PK): Identificador único
- `idDispositivo` (FK): Referencia al dispositivo
- `tipoEvento`: Tipo de evento (Alerta, Comunicación, Error, etc.)
- `mensaje`: Mensaje del evento
- `detallesAdicionales`: Detalles adicionales en JSONB

### III. Módulo de Gestión Territorial y Geográfica

#### 1. GeografiaPolitica (`geografia_politica`)
Divisiones administrativas.

**Campos principales:**
- `idGeografia` (PK): Identificador único
- `nombre`: Nombre de la división
- `tipo`: Tipo de división (Provincia, Cantón, Parroquia, Zona Administrativa)
- `idPadre` (FK): Referencia a la división padre (para jerarquía)
- `geometria`: Geometría de la zona (tipo GEOMETRY)

#### 2. Sectores (`sectores`)
Áreas de servicio/Administraciones Zonales.

**Campos principales:**
- `idSector` (PK): Identificador único
- `nombreSector`: Nombre del sector
- `idGeografiaPadre` (FK): Referencia a la geografía política
- `consumoPromedioM3Dia`: Consumo promedio diario
- `dispositivosEnSector`: Número de dispositivos en el sector

#### 3. ResumenConsumoHistorico (`resumen_consumo_historico`)
Agregaciones para rendimiento del mapa y dashboard.

**Campos principales:**
- `idResumen` (PK): Identificador único
- `idGeografia` (FK): Referencia a la geografía
- `tipoAgregacion`: Tipo de agregación (Diario, Mensual, Anual)
- `consumoTotalM3`: Consumo total
- `variacionPorcentualMesAnterior`: Variación porcentual

### IV. Módulo CRM Inteligente / Atención al Cliente

#### 1. Clientes (`clientes`)
Abonados al servicio de agua.

**Campos principales:**
- `idCliente` (PK): Identificador único
- `nombre`, `apellido`: Datos personales (CIFRADOS)
- `telefonoContacto` (Único): Teléfono (CIFRADO)
- `email` (Único): Email (CIFRADO)
- `direccionServicio`: Dirección (CIFRADA)
- `tipoCliente`: Tipo de cliente (Residencial, Comercial, Industrial)
- `estadoCuenta`: Estado de la cuenta

**Relaciones:**
- Ubicado en un `Sector`
- Tiene múltiples `ConversacionesCRM`

#### 2. ConversacionesCRM (`conversaciones_crm`)
Hilos de comunicación con clientes.

**Campos principales:**
- `idConversacion` (PK): Identificador único
- `idCliente` (FK): Referencia al cliente
- `plataformaOrigen`: Plataforma de origen (WhatsApp, WebChat, Telefónico, Email)
- `estadoConversacion`: Estado de la conversación
- `idAgenteAsignado` (FK): Agente asignado
- `prioridad`: Prioridad de la conversación
- `etiquetas`: Etiquetas en formato JSONB

#### 3. MensajesCRM (`mensajes_crm`)
Mensajes individuales de las conversaciones.

**Campos principales:**
- `idMensaje` (PK): Identificador único
- `idConversacion` (FK): Referencia a la conversación
- `tipoRemitente`: Tipo de remitente (Cliente, Agente, Chatbot)
- `contenido`: Contenido del mensaje
- `enviadoPorChatbot`: Indica si fue enviado por chatbot

#### 4. InteraccionesAgente (`interacciones_agente`)
Acciones del agente en conversaciones.

#### 5. KPIsAtencionHistorico (`kpis_atencion_historico`)
Métricas pre-calculadas de atención al cliente.

#### 6. EntrenamientoModeloIA (`entrenamiento_modelo_ia`)
Contribuciones del personal al modelo de IA.

### V. Módulo de Denuncias Ciudadanas

#### 1. DenunciasCiudadanas (`denuncias_ciudadanas`)
Reclamos de la comunidad.

**Campos principales:**
- `idDenuncia` (PK): Identificador único
- `titulo`: Título de la denuncia
- `descripcionDetallada`: Descripción detallada
- `latitud`, `longitud`: Coordenadas GPS
- `estadoDenuncia`: Estado de la denuncia
- `prioridad`: Prioridad de la denuncia
- `idTecnicoAsignado` (FK): Técnico asignado

#### 2. HistorialDenuncia (`historial_denuncia`)
Bitácora de seguimiento de denuncias.

### VI. Módulo de Gestión de Problemas (Incidentes Internos)

#### 1. Incidentes (`incidentes`)
Problemas técnicos internos.

**Campos principales:**
- `idIncidente` (PK): Identificador único
- `titulo`: Título del incidente
- `descripcionDetallada`: Descripción detallada
- `prioridad`: Prioridad del incidente
- `estadoIncidente`: Estado del incidente
- `idDispositivoAfectado` (FK): Dispositivo afectado
- `idTecnicoAsignado` (FK): Técnico asignado

#### 2. BitacoraIncidente (`bitacora_incidente`)
Historial de seguimiento de incidentes.

#### 3. EquipoTecnico (`equipo_tecnico`)
Información específica para usuarios técnicos.

**Campos principales:**
- `idUsuario` (PK/FK): Referencia al usuario
- `especialidad`: Especialidad del técnico
- `calificacionPromedio`: Calificación promedio
- `estadoDisponibilidad`: Estado de disponibilidad

### VII. Módulo de Eficiencia Hídrica

#### 1. RegistrosPerdidas (`registros_perdidas`)
Estimación de pérdidas de agua.

**Campos principales:**
- `idRegistroPerdida` (PK): Identificador único
- `fechaRegistro`: Fecha del registro
- `porcentajePerdida`: Porcentaje de pérdida (0-100%)
- `volumenPerdidaM3`: Volumen estimado de pérdida
- `metodoEstimacion`: Método de estimación

## Relaciones Principales

### Relaciones Core
- `Usuarios` → `Departamentos` (N:1)
- `Usuarios` ↔ `Roles` (N:N a través de `usuario_roles`)
- `Roles` ↔ `Permisos` (N:N a través de `rol_permisos`)

### Relaciones de Dispositivos
- `Gateways` → `Dispositivos` (1:N)
- `Dispositivos` → `DatosConsumoAgua` (1:N)
- `Dispositivos` → `MantenimientosDispositivo` (1:N)
- `Dispositivos` → `LogsTecnicosDispositivo` (1:N)

### Relaciones Territoriales
- `GeografiaPolitica` → `GeografiaPolitica` (1:N, jerarquía)
- `GeografiaPolitica` → `Sectores` (1:N)
- `GeografiaPolitica` → `ResumenConsumoHistorico` (1:N)

### Relaciones CRM
- `Clientes` → `ConversacionesCRM` (1:N)
- `ConversacionesCRM` → `MensajesCRM` (1:N)
- `ConversacionesCRM` → `InteraccionesAgente` (1:N)
- `Usuarios` → `ConversacionesCRM` (1:N, como agente)

### Relaciones de Denuncias e Incidentes
- `Usuarios` → `DenunciasCiudadanas` (1:N, como reportante/tecnico)
- `DenunciasCiudadanas` → `HistorialDenuncia` (1:N)
- `Usuarios` → `Incidentes` (1:N, como reportante/tecnico)
- `Incidentes` → `BitacoraIncidente` (1:N)
- `Usuarios` → `EquipoTecnico` (1:1)

## Configuración de Base de Datos

### PostgreSQL
- Tipo: PostgreSQL
- Sincronización automática habilitada para desarrollo
- Soporte para tipos JSONB y GEOMETRY
- Índices automáticos en claves primarias y únicas

### Variables de Entorno Requeridas
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=iot_water
ENCRYPTION_KEY=your-secret-encryption-key
```

## Uso con Swagger

Todas las entidades incluyen DTOs con decoradores de Swagger para documentación automática de la API. Los datos personales se descifran automáticamente antes de ser enviados en las respuestas.

### Ejemplo de Uso

```typescript
// Crear un usuario
const usuario = new Usuario();
usuario.nombre = "Juan";
usuario.apellido = "Pérez";
usuario.email = "juan.perez@empresa.com";
// Los datos se cifran automáticamente antes de guardar

// Recuperar un usuario
const usuarioRecuperado = await usuarioRepository.findOne(id);
usuarioRecuperado.descifrarDatosPersonales();
// Los datos se descifran para mostrar
```

## Notas de Implementación

1. **Cifrado Automático**: Los hooks `@BeforeInsert` y `@BeforeUpdate` cifran automáticamente los datos personales
2. **Descifrado Manual**: Se debe llamar al método `descifrarDatosPersonales()` para mostrar los datos
3. **Clave de Cifrado**: Debe configurarse la variable de entorno `ENCRYPTION_KEY`
4. **Tipos de Datos**: Se utilizan tipos específicos como JSONB, GEOMETRY, ENUM para optimizar el rendimiento
5. **Relaciones**: Todas las relaciones están correctamente definidas con claves foráneas
6. **Validación**: Los DTOs incluyen validaciones usando class-validator
7. **Documentación**: Swagger está configurado para documentar automáticamente la API 