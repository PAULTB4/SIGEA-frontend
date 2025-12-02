# 🔗 Mapping de Endpoints: Frontend ↔ Backend

## 📋 Cómo usar este documento

Para cada endpoint:
- **Frontend**: Dónde se consume en el código
- **Request**: Qué envía el frontend
- **Response Esperada**: Qué espera recibir el frontend
- **⚠️ Validar**: Qué debes verificar con el backend

---

## 🔐 AUTENTICACIÓN

### 1. Login
**Frontend:** `src/services/authService.js` → línea 24  
**Endpoint:** `POST /usuarios/auth/login`

**Request:**
```json
{
  "correo": "user@example.com",
  "password": "password123",
  "mantenerSesion": true
}
```

**Response Esperada:**
```json
{
  "status": true,
  "message": "Login exitoso",
  "extraData": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Refresh_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Token JWT debe contener:**
```json
{
  "usuarioId": "123",
  "roles": ["participante"],
  "exp": 1234567890,
  "iat": 1234567890
}
```

**⚠️ Validar:**
- [ ] Campo `correo` vs `email`
- [ ] Campo `mantenerSesion` vs `rememberMe`
- [ ] Estructura del token JWT (roles como array)
- [ ] Header `x-new-token` si se usa

---

### 2. Registro de Participante
**Frontend:** `src/services/authService.js` → línea 144  
**Endpoint:** `POST /usuarios/participante/registrar`

**Request:**
```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "correo": "juan@example.com",
  "password": "Password123!",
  "dni": "12345678",
  "telefono": "987654321",
  "extensionTelefonica": "+51"
}
```

**Response Esperada:**
```json
{
  "status": true,
  "message": "Usuario registrado con éxito"
}
```

**⚠️ Validar:**
- [ ] El backend devuelve código 200 (no 400)
- [ ] Si devuelve 400, verificar que el mensaje diga "éxito" (workaround en línea 166)
- [ ] Campos de nombre separados vs nombre completo
- [ ] Formato de teléfono
- [ ] Validaciones de password

---

### 3. Refresh Token
**Frontend:** `src/services/axiosConfig.js` → línea 125  
**Endpoint:** `POST /usuarios/auth/refresh`

**Request:**
```json
{
  "token": "currentAccessToken"
}
```

**Response Esperada:**
```json
{
  "status": true,
  "extraData": {
    "tokenUsuario": "newAccessToken"
  }
}
```

**⚠️ Validar:**
- [ ] Nombre del campo del nuevo token
- [ ] Si se debe enviar refreshToken en lugar de accessToken
- [ ] Tiempo de expiración del nuevo token

---

### 4. Registro de Administrador
**Frontend:** `src/config/api.config.js` → línea 16  
**Endpoint:** `POST /usuarios/administrador/auth/register`

**⚠️ Validar:**
- [ ] Este endpoint existe en el backend
- [ ] Permisos necesarios
- [ ] Proceso de registro de admin

---

### 5. Recuperación de Contraseña (ACTUALMENTE MOCK)
**Frontend:** `src/services/authService.js` → líneas 196, 215, 237

**Endpoints Actuales (VERIFICAR):**
```
POST /auth/password-recovery/initiate
POST /auth/password-recovery/verify-code
POST /auth/password-recovery/reset
```

**⚠️ Validar:**
- [ ] URLs correctas según backend
- [ ] Flujo completo soportado
- [ ] Formato de datos de cada paso

---

## 👤 USUARIOS

### 6. Obtener Perfil
**Frontend:** `src/config/api.config.js` → línea 23  
**Endpoint:** `GET /usuarios/perfil`

**Headers:**
```
Authorization: Bearer <token>
```

**Response Esperada:**
```json
{
  "status": true,
  "data": {
    "id": "123",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "correo": "juan@example.com",
    "dni": "12345678",
    "telefono": "987654321"
  }
}
```

**⚠️ Validar:**
- [ ] Estructura exacta de usuario
- [ ] Campos adicionales (foto, institución, etc.)

---

### 7. Dashboard Home (por Rol)
**Frontend:** `src/config/api.config.js` → líneas 25-28

**Endpoints:**
```
GET /usuarios/participante/home
GET /usuarios/organizador/home
GET /usuarios/organizador/dashboard
GET /usuarios/administrador/home
```

**⚠️ Validar:**
- [ ] Qué datos devuelve cada endpoint
- [ ] Si existen estos endpoints
- [ ] Estructura de estadísticas

---

## 🎓 ACTIVIDADES

### 8. Listar Actividades
**Frontend:** `src/services/activityService.js` → línea 80  
**Endpoint:** `GET /actividades/listar?page=1&limit=10`

**Response Esperada:**
```json
{
  "status": true,
  "data": [
    {
      "id": "act_001",
      "title": "Curso de React",
      "type": "Curso",
      "status": "activa",
      "startDate": "2025-02-01",
      "endDate": "2025-03-01",
      "duration": "40 horas",
      "participantCount": 25,
      "coverImage": "url_to_image"
    }
  ]
}
```

**⚠️ Validar:**
- [ ] Nombres de campos (title vs titulo, etc.)
- [ ] Formato de fechas (ISO vs dd/MM/yyyy)
- [ ] Campo de imagen (URL vs objeto)
- [ ] Paginación (page/limit vs offset/limit)

---

### 9. Crear Actividad
**Frontend:** `src/services/activityService.js` → línea 46  
**Endpoint:** `POST /actividades/crear`

**Content-Type:** `multipart/form-data`

**Request (FormData):**
```
title: "Curso de React"
type: "Curso"
estimatedDuration: "40"
startDate: "2025-02-01"
startTime: "08:00"
endDate: "2025-03-01"
endTime: "17:00"
primaryOrganizer: "Dr. Juan Pérez"
coOrganizer: "Dra. María López"
sponsor: "Universidad X"
description: "Descripción completa..."
coverImage: [File]
files[]: [File, File, ...]
```

**Response Esperada:**
```json
{
  "status": true,
  "message": "Actividad creada exitosamente",
  "data": {
    "id": "act_new_123",
    ...
  }
}
```

**⚠️ Validar:**
- [ ] Nombres de campos en FormData
- [ ] Formato de fechas y horas
- [ ] Nombre del campo de archivos: `files[]` vs `contentFiles`
- [ ] Tamaño máximo de archivos
- [ ] Tipos de archivo aceptados

---

### 10. Actualizar Actividad
**Frontend:** `src/services/activityService.js` → línea 158  
**Endpoint:** `PUT /actividades/actualizar`

**⚠️ Validar:**
- [ ] Si necesita ID en URL: `/actividades/actualizar/{id}`
- [ ] Campos editables vs no editables
- [ ] Si soporta FormData para imágenes

---

### 11. Eliminar Actividad
**Frontend:** `src/services/activityService.js` → línea 186  
**Endpoint:** `DELETE /actividades/eliminar`

**⚠️ Validar:**
- [ ] Si necesita ID en URL o body
- [ ] Soft delete vs hard delete
- [ ] Restricciones (actividades con participantes)

---

## 👥 PARTICIPANTES DE ACTIVIDAD

### 12. Listar Participantes por Actividad
**Frontend:** `src/services/activityService.js` → línea 368  
**Endpoint:** `GET /activities/{activityId}/participants`

**Response Esperada:**
```json
{
  "status": true,
  "data": [
    {
      "id": "part_001",
      "name": "Juan Pérez García",
      "email": "juan@example.com",
      "registrationDate": "2025-01-25",
      "attended": true,
      "paymentStatus": "PAGADO"
    }
  ]
}
```

**⚠️ Validar:**
- [ ] URL correcta con ID de actividad
- [ ] Valores de `paymentStatus`: PAGADO, PENDIENTE, EXONERADO
- [ ] Campo `name` vs `nombres`/`apellidos` separados

---

### 13. Registrar Asistencia
**Frontend:** `src/services/activityService.js` → línea 394  
**Endpoint:** `POST /activities/{activityId}/attendance`

**Request:**
```json
{
  "attendance": {
    "part_001": true,
    "part_002": false,
    "part_003": true
  }
}
```

**⚠️ Validar:**
- [ ] Estructura del objeto attendance
- [ ] Si es array vs objeto
- [ ] Si se envía fecha/hora

---

### 14. Verificar Pago Manualmente
**Frontend:** `src/services/activityService.js` → línea 765  
**Endpoint:** `PUT /activities/{activityId}/participants/{participantId}/payment`

**Content-Type:** `multipart/form-data`

**Request:**
```
proofFile: [File]
```

**⚠️ Validar:**
- [ ] URL correcta con IDs
- [ ] Nombre del campo del archivo
- [ ] Tipos de archivo aceptados
- [ ] Si devuelve el participante actualizado

---

## 📝 INSCRIPCIONES (Participante)

### 15. Inscribirse en Actividad
**Frontend:** `src/config/api.config.js` → línea 47  
**Endpoint:** `POST /usuarios/participante/inscripcion`

**Request:**
```json
{
  "activityId": "act_001",
  "additionalInfo": "..."
}
```

**Response Esperada:**
```json
{
  "status": true,
  "message": "Inscripción completada",
  "data": {
    "enrollmentId": "enr_123",
    "activityId": "act_001",
    "status": "pendiente_pago"
  }
}
```

**⚠️ Validar:**
- [ ] Campos adicionales requeridos
- [ ] Si devuelve enrollmentId
- [ ] Estado inicial de inscripción

---

### 16. Mis Inscripciones
**Frontend:** `src/services/participantService.js` → línea 47  
**Endpoint:** `GET /participants/enrollments`

**Response Esperada:**
```json
{
  "status": true,
  "data": [
    {
      "id": "enr_001",
      "activityId": "act_001",
      "title": "Curso de React",
      "status": "en_curso",
      "paymentStatus": "PAGADO",
      "enrolledDate": "2025-01-15",
      "startDate": "2025-02-01",
      "endDate": "2025-03-01"
    }
  ]
}
```

**⚠️ Validar:**
- [ ] URL correcta
- [ ] Si devuelve información completa de la actividad
- [ ] Estados posibles: pendiente, en_curso, finalizada

---

### 17. Realizar Pago
**Frontend:** `src/services/participantService.js` → línea 163  
**Endpoint:** `POST /participants/payments`

**Request:**
```json
{
  "enrollmentId": "enr_123",
  "paymentMethod": "transferencia",
  "amount": 100.00,
  "proofFile": [File]
}
```

**⚠️ Validar:**
- [ ] Campos requeridos
- [ ] Si acepta archivo de comprobante
- [ ] Métodos de pago soportados

---

## 🎖️ CERTIFICADOS

### 18. Participantes Elegibles para Certificado
**Frontend:** `src/services/activityService.js` → línea 447  
**Endpoint:** `GET /activities/{activityId}/issuable-participants`

**Response Esperada:**
```json
{
  "status": true,
  "data": [
    {
      "id": "part_001",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "attendanceRate": 100,
      "paymentStatus": "PAGADO"
    }
  ]
}
```

**⚠️ Validar:**
- [ ] Criterios de elegibilidad
- [ ] Campo attendanceRate (porcentaje)

---

### 19. Emitir Certificado Individual
**Frontend:** `src/services/activityService.js` → línea 473  
**Endpoint:** `POST /activities/{activityId}/issue-certificate/{participantId}`

**Response Esperada:**
```json
{
  "status": true,
  "message": "Certificado emitido",
  "data": {
    "certificateId": "cert_123",
    "participantId": "part_001",
    "issuedAt": "2025-02-01T10:00:00Z"
  }
}
```

**⚠️ Validar:**
- [ ] URL correcta
- [ ] Si devuelve URL de descarga
- [ ] Si envía email al participante

---

### 20. Emitir Certificados Masivos
**Frontend:** `src/services/activityService.js` → línea 500  
**Endpoint:** `POST /activities/{activityId}/bulk-issue-certificates`

**Response Esperada:**
```json
{
  "status": true,
  "message": "5 certificados emitidos",
  "data": {
    "issued": 5,
    "failed": 0,
    "activityId": "act_001"
  }
}
```

**⚠️ Validar:**
- [ ] Si procesa todos los elegibles automáticamente
- [ ] Manejo de errores parciales

---

### 21. Mis Certificados (Participante)
**Frontend:** `src/services/participantService.js` → línea 74  
**Endpoint:** `GET /participants/certificates`

**Response Esperada:**
```json
{
  "status": true,
  "data": [
    {
      "id": "cert_001",
      "title": "Certificación en React",
      "activityTitle": "Curso de React",
      "issueDate": "2025-02-01",
      "status": "Emitido",
      "downloadUrl": "url_to_pdf",
      "verificationCode": "CERT-2025-001"
    }
  ]
}
```

**⚠️ Validar:**
- [ ] Si devuelve URL de descarga directa
- [ ] Código de verificación único

---

### 22. Descargar Certificado
**Frontend:** `src/services/participantService.js` → línea 195  
**Endpoint:** `GET /participants/certificates/{certificateId}/download`

**Response:** PDF Blob

**⚠️ Validar:**
- [ ] Content-Type: application/pdf
- [ ] Content-Disposition con nombre de archivo
- [ ] Tamaño del PDF

---

### 23. Validar Certificado (Público)
**Frontend:** `src/services/participantService.js` → línea 223  
**Endpoint:** `GET /certificates/{certificateId}/verify`

**Sin autenticación**

**Response Esperada:**
```json
{
  "status": true,
  "data": {
    "certificateId": "cert_001",
    "title": "Certificación en React",
    "holder": "Juan Pérez",
    "issueDate": "2025-02-01",
    "status": "Válido",
    "validationCode": "CERT-2025-001"
  }
}
```

**⚠️ Validar:**
- [ ] Endpoint público (sin token)
- [ ] Estados: Válido, Revocado, No encontrado

---

## 📄 REPORTES Y DOCUMENTACIÓN

### 24. Subir Reporte
**Frontend:** `src/services/activityService.js` → línea 791  
**Endpoint:** (VERIFICAR CON BACKEND)

**Content-Type:** `multipart/form-data`

**Request:**
```
activityId: "act_001"
reportType: "proposal" | "final" | "evidence"
file: [File]
```

**⚠️ Validar:**
- [ ] URL correcta del endpoint
- [ ] Tipos de reporte soportados
- [ ] Tamaño máximo de archivo

---

### 25. Descargar Reporte
**Frontend:** `src/services/activityService.js` → línea 843  
**Endpoint:** (VERIFICAR CON BACKEND)

**⚠️ Validar:**
- [ ] Endpoint de descarga
- [ ] Si devuelve lista de reportes

---

## 🎯 EVENTOS PÚBLICOS

### 26. Eventos para Landing Page
**Frontend:** `src/api/sigeaHooks.jsx` → línea 41  
**Endpoints Actuales (MOCK):**
```
GET /programs
GET /certifications  
GET /reviews
```

**⚠️ Validar:**
- [ ] URLs correctas según backend
- [ ] Estructura de datos de cada tipo
- [ ] Si existen endpoints públicos

---

## 📊 DASHBOARD ESTADÍSTICAS

### 27. Estadísticas del Organizador
**Frontend:** `src/services/activityService.js` → línea 342  
**Endpoint:** `GET /dashboard/stats`

**Response Esperada:**
```json
{
  "status": true,
  "data": {
    "activitiesCount": 10,
    "participantsCount": 250,
    "certificatesCount": 180,
    "attendanceRate": 88
  }
}
```

**⚠️ Validar:**
- [ ] URL correcta
- [ ] Campos de estadísticas

---

### 28. Estadísticas del Participante
**Frontend:** `src/services/participantService.js` → línea 101  
**Endpoint:** `GET /participants/stats`

**Response Esperada:**
```json
{
  "status": true,
  "data": {
    "activeCourses": 2,
    "certificatesObtained": 5,
    "pendingPayments": 1,
    "completedActivities": 3
  }
}
```

**⚠️ Validar:**
- [ ] URL correcta
- [ ] Campos específicos

---

## ⚙️ ADMIN / ROLES

### 29. Crear Rol
**Frontend:** `src/config/api.config.js` → línea 33  
**Endpoint:** `POST /usuarios/administrador/crear-rol`

**⚠️ Validar:**
- [ ] Estructura del rol
- [ ] Permisos disponibles

---

### 30. Listar Roles
**Frontend:** `src/config/api.config.js` → línea 34  
**Endpoint:** `GET /usuarios/roles`

**⚠️ Validar:**
- [ ] Qué devuelve
- [ ] Si incluye permisos

---

## 📝 RESUMEN DE VALIDACIONES CRÍTICAS

### 🔴 Alta Prioridad
- [ ] Estructura del token JWT (roles como array)
- [ ] Endpoints de autenticación (login, refresh)
- [ ] Formato de fechas en todo el sistema
- [ ] Nombres de campos (español vs inglés)
- [ ] Multipart/form-data para archivos
- [ ] CORS configurado en backend

### 🟡 Media Prioridad
- [ ] Paginación (page/limit vs offset/limit)
- [ ] Estados de entidades (nombres y valores)
- [ ] Códigos de respuesta HTTP
- [ ] Mensajes de error

### 🟢 Baja Prioridad
- [ ] Optimizaciones de performance
- [ ] Campos opcionales vs requeridos
- [ ] Validaciones de frontend vs backend

---

## 📞 Próximos Pasos

1. **Reunión con Backend Team:**
   - Revisar este documento endpoint por endpoint
   - Confirmar URLs y estructuras
   - Resolver discrepancias

2. **Crear Documento de Discrepancias:**
   - Listar diferencias encontradas
   - Decidir quién ajusta (frontend o backend)

3. **Testing Coordinado:**
   - Probar cada endpoint integrado
   - Documentar bugs encontrados
