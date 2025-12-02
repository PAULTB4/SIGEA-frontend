# ✅ Checklist de Integración Frontend-Backend SIGEA

## 🎯 Objetivo
Integrar el frontend React con la API REST del backend de forma rápida y efectiva.

---

## 📋 Fase 1: Configuración Inicial (30 min)

### 1.1 Variables de Entorno
- [ ] Crear archivo `.env.development` en la raíz del proyecto
- [ ] Configurar `VITE_API_URL` con la URL del backend
  ```bash
  VITE_API_URL=http://localhost:8080/api/v1
  VITE_API_TIMEOUT=30000
  VITE_USE_MOCK_API=false
  VITE_ENABLE_LOGS=true
  ```
- [ ] Crear `.env.production` con la URL de producción
- [ ] Verificar que `.env*` esté en `.gitignore`

### 1.2 Validar Configuración
- [ ] Verificar que `src/config/api.config.js` use correctamente las variables
- [ ] Confirmar que `import.meta.env.VITE_API_URL` funcione
- [ ] Probar en consola que la URL base se cargue correctamente

---

## 🔐 Fase 2: Autenticación (1-2 horas)

### 2.1 Endpoint de Login
**Archivo:** `src/services/authService.js` → función `login()`

- [ ] Verificar que el endpoint sea `POST /usuarios/auth/login`
- [ ] Confirmar estructura del request body:
  ```json
  {
    "correo": "user@example.com",
    "password": "password123",
    "mantenerSesion": true
  }
  ```
- [ ] Validar estructura de respuesta del backend:
  ```json
  {
    "status": true,
    "message": "Login exitoso",
    "extraData": {
      "accessToken": "eyJ...",
      "Refresh_Token": "eyJ..."
    }
  }
  ```
- [ ] Verificar que el token JWT contenga los claims necesarios:
  - `usuarioId`
  - `roles` (array)
  - `exp`, `iat`
- [ ] Ajustar lógica de extracción del rol en `authService.js` líneas 66-88
- [ ] Probar login con usuario real del backend

### 2.2 Endpoint de Registro
**Archivo:** `src/services/authService.js` → función `register()`

- [ ] Confirmar endpoint `POST /usuarios/participante/registrar`
- [ ] Validar campos requeridos:
  ```json
  {
    "nombres": "string",
    "apellidos": "string",
    "correo": "string",
    "password": "string",
    "dni": "string",
    "telefono": "string",
    "extensionTelefonica": "string"
  }
  ```
- [ ] Verificar manejo del código 400 con mensaje de éxito (líneas 162-178)
- [ ] Ajustar si el backend cambió el comportamiento
- [ ] Probar registro completo

### 2.3 Refresh Token
**Archivo:** `src/services/axiosConfig.js` → interceptor response

- [ ] Confirmar endpoint `POST /usuarios/auth/refresh`
- [ ] Validar request body: `{ "token": "currentToken" }`
- [ ] Verificar estructura de respuesta
- [ ] Probar que el refresh automático funcione (simular 401)
- [ ] Verificar que redirija a `/auth` si falla el refresh

### 2.4 Recuperación de Contraseña
**Archivo:** `src/services/authService.js`

- [ ] Verificar endpoints (actualmente mock):
  - `POST /auth/password-recovery/initiate` (línea 196)
  - `POST /auth/password-recovery/verify-code` (línea 215)
  - `POST /auth/password-recovery/reset` (línea 237)
- [ ] Actualizar URLs según documentación del backend
- [ ] Cambiar `USE_MOCK_API` a `false` para estos métodos
- [ ] Probar flujo completo de recuperación

---

## 🎓 Fase 3: Módulo de Actividades (2-3 horas)

### 3.1 Listar Actividades
**Archivo:** `src/services/activityService.js` → `getActivities()`

- [ ] Confirmar endpoint `GET /actividades/listar`
- [ ] Verificar parámetros de query: `?page=1&limit=10`
- [ ] Validar estructura de respuesta:
  ```json
  {
    "status": true,
    "data": [
      {
        "id": "string",
        "title": "string",
        "type": "string",
        "status": "string",
        "startDate": "string",
        "endDate": "string",
        "participantCount": number
      }
    ]
  }
  ```
- [ ] Ajustar mapeo de campos si difieren
- [ ] Cambiar `USE_MOCK_API` a `false` (línea 7)
- [ ] Probar desde el dashboard del organizador

### 3.2 Crear Actividad
**Archivo:** `src/services/activityService.js` → `createActivity()`

- [ ] Confirmar endpoint `POST /actividades/crear`
- [ ] Verificar que acepte `multipart/form-data`
- [ ] Validar campos del FormData:
  - Textos: title, type, description, etc.
  - Archivos: coverImage, contentFiles[]
- [ ] Ajustar nombres de campos según backend (líneas 18-38)
- [ ] Probar creación con archivo de imagen
- [ ] Verificar que los archivos se suban correctamente

### 3.3 Actualizar y Eliminar
- [ ] Confirmar `PUT /actividades/actualizar` (línea 158)
- [ ] Confirmar `DELETE /actividades/eliminar` (línea 186)
- [ ] Ajustar parámetros según documentación
- [ ] Probar edición y eliminación

---

## 👥 Fase 4: Módulo de Participantes (2 horas)

### 4.1 Dashboard del Participante
**Archivo:** `src/services/participantService.js`

- [ ] Confirmar `GET /participants/profile` → Perfil
- [ ] Confirmar `GET /participants/enrollments` → Inscripciones
- [ ] Confirmar `GET /participants/certificates` → Certificados
- [ ] Confirmar `GET /participants/stats` → Estadísticas
- [ ] Actualizar endpoints según documentación (actualmente genéricos)
- [ ] Cambiar `USE_MOCK_API` a `false` (línea 7)
- [ ] Probar cada vista del dashboard

### 4.2 Inscripción a Actividades
**Archivo:** `src/services/participantService.js` → `enrollInActivity()`

- [ ] Confirmar endpoint para inscripción (actualmente `/participants/enrollments`)
- [ ] Verificar estructura del request:
  ```json
  {
    "activityId": "string",
    ...enrollmentData
  }
  ```
- [ ] Validar respuesta con enrollmentId
- [ ] Probar inscripción desde EventosDisponibles

### 4.3 Gestión de Pagos
**Archivo:** `src/services/participantService.js` → `submitPayment()`

- [ ] Confirmar endpoint de pagos
- [ ] Verificar si acepta archivos (comprobante)
- [ ] Ajustar según documentación del backend
- [ ] Probar flujo de pago completo

---

## 🎖️ Fase 5: Certificados (1-2 horas)

### 5.1 Emisión (Organizador)
**Archivo:** `src/services/activityService.js`

- [ ] `getIssuableParticipants()` - Elegibles para certificado
- [ ] `issueCertificate()` - Emitir uno
- [ ] `bulkIssueCertificates()` - Emisión masiva
- [ ] Confirmar endpoints según documentación
- [ ] Probar desde CertificateManager

### 5.2 Descarga (Participante)
**Archivo:** `src/services/participantService.js` → `downloadCertificate()`

- [ ] Confirmar endpoint de descarga
- [ ] Verificar `responseType: 'blob'` para PDF
- [ ] Probar descarga desde MisCertificados

### 5.3 Validación Pública
**Archivo:** `src/services/participantService.js` → `verifyCertificate()`

- [ ] Confirmar endpoint público (sin auth)
- [ ] Probar desde ValidationPage

---

## 📊 Fase 6: Gestión de Participantes por Actividad (1-2 horas)

### 6.1 Listar Participantes
**Archivo:** `src/services/activityService.js` → `getParticipants()`

- [ ] Confirmar endpoint con activityId
- [ ] Validar estructura de participante:
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "paymentStatus": "PAGADO|PENDIENTE|EXONERADO",
    "attended": boolean
  }
  ```
- [ ] Probar desde ParticipantManager

### 6.2 Registro de Asistencia
**Archivo:** `src/services/activityService.js` → `saveAttendance()`

- [ ] Confirmar endpoint
- [ ] Verificar estructura del request body
- [ ] Probar guardado de asistencia

### 6.3 Verificación de Pagos
**Archivo:** `src/services/activityService.js` → `verifyPaymentManually()`

- [ ] Confirmar endpoint (línea 765)
- [ ] Verificar que acepte FormData con archivo
- [ ] Probar desde PaymentVerificationModal

---

## 📄 Fase 7: Documentación y Reportes (1 hora)

### 7.1 Subida de Reportes
**Archivo:** `src/services/activityService.js` → `uploadReport()`

- [ ] Confirmar endpoint (línea 791)
- [ ] Verificar tipos de reporte: proposal, final, evidence
- [ ] Probar subida desde ReportsDocumentation

### 7.2 Descarga de Reportes
- [ ] Confirmar endpoint de descarga
- [ ] Implementar si no existe
- [ ] Probar descarga de PDFs

---

## 🧪 Fase 8: Testing de Integración (2-3 horas)

### 8.1 Testing Manual por Rol

**Participante:**
- [ ] Login → Ver dashboard
- [ ] Ver eventos disponibles
- [ ] Inscribirse en un evento
- [ ] Subir comprobante de pago
- [ ] Ver mis inscripciones
- [ ] Descargar certificado

**Organizador:**
- [ ] Login → Ver dashboard
- [ ] Crear nueva actividad con imagen
- [ ] Editar actividad
- [ ] Ver participantes
- [ ] Registrar asistencia
- [ ] Verificar pago
- [ ] Emitir certificado individual
- [ ] Emitir certificados masivos
- [ ] Subir documentación

**Administrador:**
- [ ] Login → Ver dashboard
- [ ] Acceder a funciones admin

### 8.2 Testing de Errores
- [ ] Probar login con credenciales incorrectas
- [ ] Probar acceso sin token (debe redirigir)
- [ ] Probar token expirado (debe hacer refresh)
- [ ] Probar refresh fallido (debe redirigir a login)
- [ ] Probar acceso a ruta sin permiso (403)
- [ ] Probar endpoints con datos inválidos

---

## 🔧 Fase 9: Ajustes Finales (1 hora)

### 9.1 Desactivar Mock API
- [ ] En `.env.development` → `VITE_USE_MOCK_API=false`
- [ ] Verificar que TODOS los servicios usen la API real
- [ ] Eliminar o comentar código mock si es necesario

### 9.2 Manejo de Errores
- [ ] Revisar mensajes de error en español
- [ ] Verificar que los errores del backend se muestren correctamente
- [ ] Ajustar `src/utils/errorHandler.js` si es necesario

### 9.3 Headers y CORS
- [ ] Verificar que el backend acepte:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
  - `Content-Type: multipart/form-data` (para archivos)
- [ ] Confirmar que CORS esté configurado en el backend
- [ ] Probar desde `http://localhost:5173` (Vite dev server)

### 9.4 Normalización de Respuestas
**Archivo:** `src/utils/apiHelpers.js` → `normalizeResponse()`

- [ ] Revisar función de normalización
- [ ] Ajustar según formato exacto del backend
- [ ] Asegurar consistencia en todos los servicios

---

## 📝 Fase 10: Documentación (30 min)

### 10.1 Crear README de Integración
- [ ] Documentar configuración de variables de entorno
- [ ] Documentar endpoints integrados vs pendientes
- [ ] Documentar problemas conocidos
- [ ] Documentar próximos pasos

### 10.2 Actualizar Equipo
- [ ] Notificar al equipo que la integración está lista
- [ ] Compartir documentación creada
- [ ] Programar sesión de Q&A si es necesario

---

## ⚠️ Problemas Comunes y Soluciones

| Problema | Solución |
|----------|----------|
| CORS Error | Configurar backend para permitir `http://localhost:5173` |
| Token no se envía | Verificar interceptor en `axiosConfig.js` |
| 401 en todas las peticiones | Verificar formato del token JWT |
| Refresh loop infinito | Revisar lógica de refresh en interceptor |
| Campos undefined | Ajustar nombres de campos según backend |
| Archivos no se suben | Verificar `Content-Type: multipart/form-data` |

---

## 🎯 Checklist Final

- [ ] Todas las features funcionan sin mock
- [ ] No hay errores en consola
- [ ] Tokens se refrescan automáticamente
- [ ] Archivos se suben correctamente
- [ ] Certificados se descargan correctamente
- [ ] Todos los roles funcionan
- [ ] Manejo de errores es correcto
- [ ] Performance es aceptable

---

## ⏱️ Tiempo Estimado Total
**8-14 horas** dependiendo de:
- Similitud entre expectativas frontend y backend
- Cantidad de ajustes necesarios
- Complejidad de debugging

---

## 📞 Contactos Útiles
- **Backend Team:** [contacto]
- **Frontend Team:** [contacto]
- **Documentación API:** [URL]
