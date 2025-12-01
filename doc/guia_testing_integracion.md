# 🧪 Guía de Testing de Integración

## 🎯 Objetivo
Validar que todos los módulos del frontend funcionen correctamente con la API del backend.

---

## 📋 CHECKLIST GENERAL

Antes de empezar los tests:
- [ ] Backend corriendo y accesible
- [ ] Frontend corriendo (`npm run dev`)
- [ ] Variables de entorno configuradas
- [ ] `VITE_USE_MOCK_API=false`
- [ ] Credenciales de prueba disponibles
- [ ] DevTools abierto (Network + Console)

---

## 🔐 MÓDULO 1: AUTENTICACIÓN

### Test 1.1: Login Exitoso

**Datos de prueba:**
```json
{
  "email": "participante@test.com",
  "password": "Password123!"
}
```

**Pasos:**
1. Ir a `/auth`
2. Ingresar credenciales válidas
3. Click en "Iniciar Sesión"

**Resultado esperado:**
- [ ] Request `POST /usuarios/auth/login` devuelve 200
- [ ] Response contiene `accessToken`
- [ ] localStorage tiene `authToken`, `userRole`, `userEmail`
- [ ] Redirige a dashboard según rol
- [ ] No hay errores en consola

**Network → Headers verificar:**
```
Request URL: http://localhost:8080/api/v1/usuarios/auth/login
Request Method: POST
Status Code: 200
```

**Network → Response verificar:**
```json
{
  "status": true,
  "extraData": {
    "accessToken": "eyJ..."
  }
}
```

---

### Test 1.2: Login con Credenciales Incorrectas

**Datos de prueba:**
```json
{
  "email": "wrong@test.com",
  "password": "WrongPass123!"
}
```

**Resultado esperado:**
- [ ] Request devuelve 401 o 400
- [ ] Mensaje de error visible en UI
- [ ] NO se guarda nada en localStorage
- [ ] NO redirige

---

### Test 1.3: Registro de Participante

**Datos de prueba:**
```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "correo": "nuevo@test.com",
  "password": "Password123!",
  "dni": "12345678",
  "telefono": "987654321",
  "extensionTelefonica": "+51"
}
```

**Pasos:**
1. Ir a `/auth`
2. Click en "Registrarse"
3. Llenar formulario
4. Click en "Crear cuenta"

**Resultado esperado:**
- [ ] Request `POST /usuarios/participante/registrar` devuelve 200 (o 400 con mensaje de éxito)
- [ ] Mensaje "Registro exitoso" visible
- [ ] Redirige a login o loguea automáticamente

---

### Test 1.4: Logout

**Pasos:**
1. Estar logueado
2. Click en botón "Cerrar sesión" (en sidebar)

**Resultado esperado:**
- [ ] localStorage se limpia completamente
- [ ] Redirige a `/`
- [ ] Al intentar acceder a rutas privadas, redirige a `/auth`

---

### Test 1.5: Token en Headers (Automático)

**Pasos:**
1. Estar logueado
2. Navegar a cualquier sección del dashboard
3. Observar Network tab

**Resultado esperado:**
- [ ] Todas las peticiones privadas tienen el header:
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

---

### Test 1.6: Refresh Token Automático

**Pasos (difícil de probar manualmente):**
1. Loguear y obtener token
2. Esperar a que expire (o modificar fecha de expiración)
3. Hacer cualquier petición

**Resultado esperado:**
- [ ] Se detecta 401
- [ ] Se hace petición `POST /usuarios/auth/refresh` automáticamente
- [ ] Se guarda nuevo token
- [ ] Se reintenta petición original

**Nota:** Puede ser más fácil probar esto forzando un 401 desde el backend.

---

## 🎓 MÓDULO 2: ACTIVIDADES (Organizador)

### Datos de Prueba para Actividades

```json
{
  "title": "Test: Curso de React 2025",
  "type": "Curso",
  "estimatedDuration": "40",
  "startDate": "2025-03-01",
  "startTime": "08:00",
  "endDate": "2025-04-30",
  "endTime": "17:00",
  "primaryOrganizer": "Dr. Juan Pérez",
  "coOrganizer": "Dra. María López",
  "sponsor": "FIIS",
  "description": "Curso completo de React para desarrollo web moderno.",
  "coverImage": [archivo de imagen],
  "contentFiles": [archivos PDF/DOCX]
}
```

---

### Test 2.1: Listar Actividades

**Prerrequisito:** Usuario organizador logueado

**Pasos:**
1. Ir a `/organizer/dashboard`
2. Click en "Actividades" en sidebar
3. Observar lista de actividades

**Resultado esperado:**
- [ ] Request `GET /actividades/listar` devuelve 200
- [ ] Se muestra lista de actividades (puede estar vacía)
- [ ] Cada actividad muestra: título, tipo, estado, fechas
- [ ] Botones de acciones visibles

---

### Test 2.2: Crear Actividad

**Pasos:**
1. Click en "Nueva Actividad"
2. Llenar formulario paso 1 (Info Básica)
3. Subir imagen de portada
4. Click en "Siguiente"
5. Llenar paso 2 (Detalles de Organización)
6. Click en "Siguiente"
7. Subir archivos de contenido
8. Click en "Crear Actividad"

**Resultado esperado:**
- [ ] Request `POST /actividades/crear` con `multipart/form-data`
- [ ] Devuelve 200 con ID de nueva actividad
- [ ] Modal se cierra
- [ ] Lista se actualiza con nueva actividad
- [ ] Mensaje de éxito visible

**Network → Request verificar:**
```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
Request Payload debe contener:
  - Campos del formulario
  - coverImage: (binary)
  - files[]: (binary)
```

---

### Test 2.3: Editar Actividad

**Pasos:**
1. Click en botón "Editar" de una actividad
2. Modificar algún campo (ej: título)
3. Click en "Guardar"

**Resultado esperado:**
- [ ] Request `PUT /actividades/actualizar` devuelve 200
- [ ] Lista se actualiza con cambios
- [ ] Modal se cierra

---

### Test 2.4: Eliminar Actividad

**Pasos:**
1. Click en botón "Eliminar" de una actividad
2. Confirmar eliminación

**Resultado esperado:**
- [ ] Request `DELETE /actividades/eliminar` devuelve 200
- [ ] Actividad desaparece de la lista

---

## 👥 MÓDULO 3: GESTIÓN DE PARTICIPANTES

### Datos de Prueba

Necesitas una actividad creada con al menos 3 participantes inscritos.

---

### Test 3.1: Ver Participantes de Actividad

**Pasos:**
1. Ir a `/organizer/dashboard`
2. Click en "Participantes"
3. Seleccionar una actividad

**Resultado esperado:**
- [ ] Request `GET /activities/{id}/participants` devuelve 200
- [ ] Se muestra lista de participantes
- [ ] Campos visibles: nombre, email, estado de pago, asistencia

---

### Test 3.2: Registrar Asistencia

**Pasos:**
1. Seleccionar actividad con participantes
2. Marcar checkboxes de asistencia
3. Click en "Guardar Asistencia"

**Resultado esperado:**
- [ ] Request `POST /activities/{id}/attendance` devuelve 200
- [ ] Mensaje de confirmación
- [ ] Checkboxes reflejan estado guardado

**Request body esperado:**
```json
{
  "attendance": {
    "part_001": true,
    "part_002": false,
    "part_003": true
  }
}
```

---

### Test 3.3: Verificar Pago Manualmente

**Pasos:**
1. Ver participantes de una actividad
2. Identificar participante con pago PENDIENTE
3. Click en botón "Verificar pago"
4. Subir archivo de comprobante
5. Click en "Aprobar"

**Resultado esperado:**
- [ ] Request `PUT /activities/{id}/participants/{pid}/payment`
- [ ] Estado de pago cambia a PAGADO
- [ ] Archivo se sube correctamente

---

## 🎖️ MÓDULO 4: CERTIFICADOS

### Test 4.1: Ver Participantes Elegibles

**Prerrequisito:** Actividad con participantes que cumplan criterios

**Pasos:**
1. Ir a "Certificados"
2. Seleccionar actividad

**Resultado esperado:**
- [ ] Request `GET /activities/{id}/issuable-participants` devuelve 200
- [ ] Lista muestra solo participantes elegibles
- [ ] Criterios: pagado/exonerado + asistencia >= 80%

---

### Test 4.2: Emitir Certificado Individual

**Pasos:**
1. Click en "Emitir" de un participante específico

**Resultado esperado:**
- [ ] Request `POST /activities/{id}/issue-certificate/{participantId}`
- [ ] Devuelve 200 con certificateId
- [ ] Mensaje de confirmación
- [ ] Participante ya no aparece en lista de pendientes

---

### Test 4.3: Emitir Certificados Masivos

**Pasos:**
1. Click en "Emitir Todos"

**Resultado esperado:**
- [ ] Request `POST /activities/{id}/bulk-issue-certificates`
- [ ] Devuelve 200 con cantidad emitida
- [ ] Mensaje: "X certificados emitidos"
- [ ] Lista se vacía

---

### Test 4.4: Descargar Certificado (Participante)

**Prerrequisito:** Usuario participante con certificado emitido

**Pasos:**
1. Login como participante
2. Ir a "Mis Certificados"
3. Click en "Descargar" de un certificado

**Resultado esperado:**
- [ ] Request `GET /participants/certificates/{id}/download`
- [ ] Response es un Blob PDF
- [ ] Se descarga archivo `certificado_xxx.pdf`

---

### Test 4.5: Validar Certificado (Público)

**Pasos:**
1. Sin estar logueado, ir a `/validation`
2. Ingresar código de certificado
3. Click en "Validar"

**Resultado esperado:**
- [ ] Request `GET /certificates/{id}/verify` (sin token)
- [ ] Muestra información del certificado
- [ ] Estado: Válido / No encontrado

---

## 📝 MÓDULO 5: INSCRIPCIONES (Participante)

### Test 5.1: Ver Eventos Disponibles

**Prerrequisito:** Usuario participante logueado

**Pasos:**
1. Ir a `/participant/dashboard`
2. Click en "Eventos Disponibles"

**Resultado esperado:**
- [ ] Request a endpoint de eventos públicos
- [ ] Lista de actividades abiertas a inscripción
- [ ] Botón "Inscribirse" visible

---

### Test 5.2: Inscribirse en Evento

**Pasos:**
1. Click en "Inscribirse" de un evento
2. Llenar formulario si aplica
3. Click en "Confirmar Inscripción"

**Resultado esperado:**
- [ ] Request `POST /usuarios/participante/inscripcion`
- [ ] Devuelve enrollmentId
- [ ] Mensaje: "Inscripción exitosa, proceda al pago"
- [ ] Redirige a sección de pago o mis inscripciones

---

### Test 5.3: Ver Mis Inscripciones

**Pasos:**
1. Ir a "Mis Inscripciones"

**Resultado esperado:**
- [ ] Request `GET /participants/enrollments` devuelve 200
- [ ] Lista de inscripciones del usuario
- [ ] Estados: pendiente_pago, en_curso, finalizada

---

### Test 5.4: Realizar Pago

**Pasos:**
1. Identificar inscripción con pago pendiente
2. Click en "Pagar"
3. Subir comprobante de pago
4. Click en "Enviar"

**Resultado esperado:**
- [ ] Request `POST /participants/payments`
- [ ] Archivo se sube
- [ ] Estado cambia a "En revisión"

---

## 📄 MÓDULO 6: REPORTES Y DOCUMENTACIÓN

### Test 6.1: Subir Reporte de Actividad

**Pasos:**
1. Como organizador, ir a una actividad
2. Click en "Documentación"
3. Seleccionar tipo de reporte (Propuesta, Final, Evidencias)
4. Subir archivo PDF
5. Click en "Subir"

**Resultado esperado:**
- [ ] Request al endpoint de reportes con FormData
- [ ] Archivo se sube correctamente
- [ ] Mensaje de confirmación

---

## 🧪 TESTING DE ERRORES Y EDGE CASES

### Test E.1: Token Expirado

**Pasos:**
1. Loguear y guardar token
2. Esperar a que expire (o modificar manualmente en backend)
3. Intentar hacer una acción

**Resultado esperado:**
- [ ] Se detecta 401
- [ ] Se intenta refresh automático
- [ ] Si refresh falla, redirige a `/auth`

---

### Test E.2: Sin Conexión a Backend

**Pasos:**
1. Detener backend
2. Intentar hacer login

**Resultado esperado:**
- [ ] Mensaje de error de conexión
- [ ] No se rompe la UI
- [ ] Error se loguea en consola

---

### Test E.3: Acceso a Ruta Sin Permiso

**Pasos:**
1. Loguear como participante
2. Intentar ir a `/organizer/dashboard`

**Resultado esperado:**
- [ ] Redirige a `/participant/dashboard` (dashboard correcto según rol)
- [ ] No muestra contenido de organizador

---

### Test E.4: CORS Error

**Pasos:**
1. Si CORS no está configurado, hacer cualquier petición

**Resultado esperado:**
- [ ] Error visible en consola
- [ ] Mensaje de error en UI (si está manejado)

---

### Test E.5: Archivo Demasiado Grande

**Pasos:**
1. Intentar subir archivo > tamaño máximo

**Resultado esperado:**
- [ ] Error del backend o validación frontend
- [ ] Mensaje: "Archivo demasiado grande"

---

## 📊 CHECKLIST FINAL DE VALIDACIÓN

Antes de dar por terminada la integración:

### Funcionalidades Core
- [ ] Login y logout funcionan
- [ ] Refresh token automático funciona
- [ ] Tokens se envían en todas las peticiones
- [ ] Roles se manejan correctamente

### Módulos
- [ ] Actividades: CRUD completo funciona
- [ ] Participantes: Ver, registrar asistencia, verificar pago
- [ ] Certificados: Emitir, descargar, validar
- [ ] Inscripciones: Ver, inscribirse, pagar

### Manejo de Errores
- [ ] Errores de red se manejan gracefully
- [ ] Mensajes de error son claros
- [ ] UI no se rompe con errores

### Performance
- [ ] No hay memory leaks
- [ ] Peticiones no se duplican
- [ ] Tiempos de respuesta < 3s

### UX
- [ ] Loading states visibles
- [ ] Mensajes de confirmación claros
- [ ] Navegación fluida

---

## 🐛 DEBUGGING TIPS

### Ver todas las peticiones
```javascript
// En consola del navegador
performance.getEntriesByType("resource")
  .filter(r => r.name.includes("localhost:8080"))
  .forEach(r => console.log(r.name))
```

### Ver token decodificado
```javascript
// En jwt.io o en consola
const token = localStorage.getItem('authToken');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
```

### Limpiar localStorage
```javascript
localStorage.clear();
location.reload();
```

---

## 📝 TEMPLATE DE REPORTE DE BUG

Cuando encuentres un bug, documenta:

```markdown
## Bug: [Título descriptivo]

**Módulo:** [Autenticación / Actividades / etc.]

**Pasos para reproducir:**
1. Ir a...
2. Click en...
3. ...

**Resultado esperado:**
...

**Resultado actual:**
...

**Request:**
- URL: POST /...
- Body: {...}

**Response:**
- Status: 500
- Body: {...}

**Screenshots:**
[adjuntar]

**Logs de consola:**
```
[pegar logs]
```
```

---

## ⏱️ Tiempo Estimado de Testing

- Autenticación: 30 min
- Actividades: 45 min
- Participantes: 30 min
- Certificados: 30 min
- Inscripciones: 30 min
- Reportes: 15 min
- Edge cases: 30 min

**Total: ~3.5 horas**

---

## ✅ Checklist de "Integration Complete"

- [ ] Todos los tests Core pasados
- [ ] Al menos un flujo completo probado (ej: crear actividad → inscribirse → pagar → asistir → emitir certificado)
- [ ] No hay errores en consola en uso normal
- [ ] Documentación de bugs/issues creada
- [ ] Equipo de backend notificado de issues
