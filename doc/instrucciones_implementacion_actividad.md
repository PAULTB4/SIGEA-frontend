# Implementación de Gestión de Actividades - SIGEA

## Archivos Actualizados

He creado/actualizado los siguientes archivos para conectar el frontend con los endpoints del backend:

### 1. activityService.js
**Ubicación:** `src/services/activityService.js`

**Nuevos métodos implementados:**
- `getActivityTypes()` - GET /api/v1/tipos-actividad/listar
- `getActivityStates()` - GET /api/v1/estados-actividad/listar
- `getActivities()` - GET /api/v1/actividades/listar
- `getActivity(id)` - GET /api/v1/actividades/obtener/{id}
- `createActivity(data)` - POST /api/v1/actividades/create
- `updateActivity(id, data)` - PUT /api/v1/actividades/actualizar/{id}
- `deleteActivity(id)` - DELETE /api/v1/actividades/eliminar/{id}
- `normalizeActivityForUI(activity)` - Helper para normalizar datos del backend

**Características:**
- Soporta tanto API real como mocks
- Manejo de errores consistente
- Normalización automática de datos

### 2. useActivityForm.js
**Ubicación:** `src/features/activities/hooks/useActivityForm.js`

**Mejoras:**
- Carga dinámica de tipos y estados de actividad
- Validación completa del formulario
- Manejo automático del `organizadorId` desde el usuario logueado
- Soporte para edición de actividades
- Preparación de datos según estructura del backend

### 3. BasicInfo.jsx
**Ubicación:** `src/features/activities/components/ActivityForm/BasicInfo.jsx`

**Cambios:**
- Dropdown dinámico de tipos de actividad (desde API)
- Dropdown dinámico de estados (desde API)
- Validación de campos requeridos
- Estados de carga

### 4. OrganizationDetails.jsx
**Ubicación:** `src/features/activities/components/ActivityForm/OrganizationDetails.jsx`

**Nuevos campos:**
- Ubicación
- Número Yape
- Campos opcionales claramente marcados

### 5. ActivityForm.jsx
**Ubicación:** `src/features/activities/components/ActivityForm/ActivityForm.jsx`

**Actualizaciones:**
- Pasa props de dropdowns a BasicInfo
- Manejo de estados de carga
- Mensajes de error/éxito mejorados

### 6. useActivities.js
**Ubicación:** `src/features/activities/hooks/useActivities.js`

**Mejoras:**
- Normalización automática de actividades
- Manejo consistente de errores

## Instrucciones de Instalación

### Paso 1: Reemplazar archivos

Copia los archivos generados a tu proyecto:

```bash
# Servicio principal
cp activityService.js src/services/

# Hook del formulario
cp useActivityForm.js src/features/activities/hooks/

# Hook de actividades
cp useActivities.js src/features/activities/hooks/

# Componentes del formulario
cp BasicInfo.jsx src/features/activities/components/ActivityForm/
cp OrganizationDetails.jsx src/features/activities/components/ActivityForm/
cp ActivityForm.jsx src/features/activities/components/ActivityForm/
```

### Paso 2: Verificar dependencias

Asegúrate de tener el hook `useAuth` disponible:

```javascript
// src/features/auth/hooks/useAuth.jsx debe exportar:
export const useAuth = () => {
  // ... debe retornar { user } donde user tiene { id, email }
};
```

### Paso 3: Configurar variables de entorno

En tu `.env`:

```env
VITE_API_URL=https://sigeabackend.zentrycorp.dev
VITE_USE_MOCK_API=false
```

Para desarrollo con mocks:
```env
VITE_USE_MOCK_API=true
```

### Paso 4: Verificar estructura de datos

El backend debe retornar JWT con esta estructura en `extraData`:

```javascript
{
  "Access_Token": "...",
  "Refresh_Token": "...",
  "extraData": {
    "id": "user_id_here",  // ID del usuario/organizador
    "correo": "user@email.com",
    "roles": ["ORGANIZADOR"]
  }
}
```

## Mapeo de Campos

### Frontend → Backend

```javascript
{
  title → titulo
  description → descripcion
  startDate → fechaInicio
  endDate → fechaFin
  startTime → horaInicio
  endTime → horaFin
  tipoActividadId → tipoActividadId
  estadoId → estadoId
  organizadorId → organizadorId
  ubicacion → ubicacion
  coOrganizer → coOrganizador
  sponsor → sponsor
  bannerUrl → bannerUrl
  numeroYape → numeroYape
}
```

### Backend → Frontend (normalización)

La función `normalizeActivityForUI` convierte automáticamente:
- `titulo` → `title`
- `tipoActividad.nombreActividad` → `type`
- `estado.codigo` → `status`
- etc.

## Flujo de Uso

### Crear Nueva Actividad

1. Usuario hace clic en "Nueva Actividad"
2. Se muestra el formulario vacío
3. Se cargan tipos y estados desde API
4. Usuario completa el formulario
5. Al enviar, se crea la actividad con POST /api/v1/actividades/create
6. Se recarga la lista automáticamente

### Editar Actividad

1. Usuario hace clic en botón "Editar"
2. Se cargan datos de la actividad
3. Se normalizan para el formulario
4. Usuario modifica campos
5. Al enviar, se actualiza con PUT /api/v1/actividades/actualizar/{id}
6. Se recarga la lista automáticamente

### Eliminar Actividad

1. Usuario hace clic en botón "Eliminar"
2. Se muestra confirmación
3. Si confirma, DELETE /api/v1/actividades/eliminar/{id}
4. Se recarga la lista automáticamente

## Pruebas

### Con Mocks (desarrollo)

1. Configurar `VITE_USE_MOCK_API=true`
2. Los mocks simulan respuestas del backend
3. No requiere conexión al servidor

### Con API Real (producción)

1. Configurar `VITE_USE_MOCK_API=false`
2. Asegurarse de tener token válido
3. Backend debe estar accesible en `sigeabackend.zentrycorp.dev`

## Debugging

### Ver requests en consola

```javascript
// Los errores se logean automáticamente con logError
// Revisar console en DevTools
```

### Verificar token

```javascript
import authService from './services/authService';
console.log('Token:', authService.getToken());
```

### Ver datos normalizados

```javascript
// En useActivities.js, puedes agregar:
console.log('Actividades normalizadas:', normalized);
```

## Próximos Pasos

1. **Subida de imágenes/archivos**: Implementar endpoint para `bannerUrl` y `contentFiles`
2. **Búsqueda de co-organizadores**: Integrar con endpoint de búsqueda de usuarios
3. **Filtros avanzados**: Agregar más opciones de filtrado
4. **Paginación**: Implementar si hay muchas actividades
5. **Validación de permisos**: Verificar que solo el organizador pueda editar/eliminar

## Notas Importantes

- El campo `organizadorId` se obtiene automáticamente del usuario logueado
- El `primaryOrganizer` (email) es solo para mostrar, no se envía al backend
- Los dropdowns se deshabilitan mientras cargan
- Las fechas deben estar en formato `YYYY-MM-DD`
- Las horas en formato `HH:mm`

## Soporte

Si encuentras problemas:

1. Verifica que el token sea válido
2. Revisa la consola del navegador
3. Confirma que los endpoints del backend estén funcionando
4. Verifica el formato de las respuestas del backend

¡La implementación está lista para usar! 🚀