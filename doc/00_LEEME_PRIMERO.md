# 📚 Índice de Documentación - Integración SIGEA Frontend-Backend

## 🎯 Propósito
Este conjunto de documentos te ayudará a integrar rápidamente el frontend SIGEA con la API REST del backend.

---

## 📖 Documentos Disponibles

### 1. 📊 Mapeo de Arquitectura (`mapeo_arquitectura.md`)
**Cuándo usar:** Primero, para entender el proyecto en general

**Contenido:**
- Estructura completa del proyecto
- Stack tecnológico
- Sistema de autenticación
- Flujo de datos
- Diagramas de arquitectura
- Organización por features
- Sistema de diseño

**Tiempo de lectura:** 30-45 minutos

**🔗 Leer cuando:** Necesites entender cómo está organizado el proyecto

---

### 2. ⚡ Guía Rápida de Integración (`guia_rapida_integracion.md`)
**Cuándo usar:** Para empezar AHORA mismo

**Contenido:**
- Configuración en 5 minutos
- Integrar login en 20 minutos
- Resolver problemas comunes
- Primeros pasos validados

**Tiempo estimado:** 1 hora para tener login funcionando

**🔗 Leer cuando:** Quieras empezar a integrar inmediatamente

---

### 3. 🔗 Mapping de Endpoints (`mapping_endpoints.md`)
**Cuándo usar:** Como referencia durante la integración

**Contenido:**
- 30 endpoints mapeados
- Request/Response esperados para cada uno
- Validaciones importantes
- Checklist por endpoint

**Uso:** Documento de referencia constante

**🔗 Leer cuando:** Necesites saber qué espera el frontend de cada endpoint

---

### 4. ✅ Checklist de Integración (`checklist_integracion.md`)
**Cuándo usar:** Para planificar y seguir el progreso

**Contenido:**
- 10 fases de integración
- Tareas detalladas por fase
- Tiempo estimado por fase
- Problemas comunes y soluciones

**Tiempo total:** 8-14 horas de integración

**🔗 Leer cuando:** Necesites un plan completo de integración

---

### 5. 🧪 Guía de Testing (`guia_testing_integracion.md`)
**Cuándo usar:** Al finalizar cada módulo integrado

**Contenido:**
- Test cases detallados por módulo
- Datos de prueba
- Checklist de validación
- Template de reporte de bugs

**Tiempo estimado:** 3.5 horas de testing

**🔗 Leer cuando:** Necesites validar que la integración funciona

---

## 🚀 Orden Recomendado de Lectura

### Para empezar RÁPIDO (si tienes prisa):
1. **Guía Rápida** → Para tener login funcionando en 1 hora
2. **Mapping de Endpoints** → Como referencia mientras integras
3. **Guía de Testing** → Para validar cada módulo

### Para entender TODO primero (si tienes tiempo):
1. **Mapeo de Arquitectura** → Entender el proyecto completo
2. **Checklist de Integración** → Ver qué hay que hacer
3. **Mapping de Endpoints** → Referencia de cada endpoint
4. **Guía Rápida** → Empezar a integrar
5. **Guía de Testing** → Validar todo

---

## 📋 Checklist de Integración Rápida

### Día 1: Setup y Autenticación (1-2 horas)
- [ ] Leer **Guía Rápida** completa
- [ ] Configurar variables de entorno
- [ ] Integrar login
- [ ] Probar login/logout

### Día 2: Módulo Principal (2-3 horas)
- [ ] Revisar fase correspondiente en **Checklist**
- [ ] Consultar **Mapping de Endpoints** para cada endpoint
- [ ] Integrar módulo (ej: Actividades)
- [ ] Ejecutar tests del módulo en **Guía de Testing**

### Día 3: Módulos Secundarios (2-3 horas)
- [ ] Repetir proceso del Día 2 para otros módulos
- [ ] Validar integración completa

### Día 4: Testing y Ajustes (2-3 horas)
- [ ] Ejecutar todos los tests de **Guía de Testing**
- [ ] Documentar bugs encontrados
- [ ] Hacer ajustes finales

---

## 🎯 Por Rol/Responsabilidad

### Si eres el Integrador Principal:
**Lee todos los documentos** en orden recomendado completo.

### Si solo haces Testing:
1. Mapeo de Arquitectura (visión general)
2. **Guía de Testing** (completo)

### Si necesitas resolver un bug específico:
1. **Mapping de Endpoints** (buscar endpoint específico)
2. Mapeo de Arquitectura (entender flujo de datos)

### Si el backend pregunta "¿qué espera el frontend?":
**Mapping de Endpoints** → Buscar el endpoint específico

---

## 📞 Resumen de Información Crítica

### Variables de Entorno Requeridas
```bash
VITE_API_URL=http://localhost:8080/api/v1
VITE_API_TIMEOUT=30000
VITE_USE_MOCK_API=false
VITE_ENABLE_LOGS=true
```

### Endpoints Más Críticos
1. `POST /usuarios/auth/login` - Autenticación
2. `POST /usuarios/auth/refresh` - Refresh token
3. `POST /actividades/crear` - Crear actividad
4. `GET /actividades/listar` - Listar actividades
5. `POST /usuarios/participante/inscripcion` - Inscribirse

### Archivos Clave del Frontend
- `src/config/api.config.js` - Configuración de endpoints
- `src/services/axiosConfig.js` - Interceptores y headers
- `src/services/authService.js` - Lógica de autenticación
- `src/app/AppRouter.jsx` - Protección de rutas

---

## ⚠️ Problemas Comunes - Soluciones Rápidas

| Problema | Solución Rápida | Documento |
|----------|----------------|-----------|
| CORS Error | Configurar backend | Guía Rápida p.3 |
| Token no se envía | Verificar axiosConfig.js | Guía Rápida p.4 |
| Rol no se reconoce | Ajustar extracción de JWT | Mapping Endpoints #1 |
| Archivos no se suben | Verificar multipart/form-data | Mapping Endpoints #9 |
| 401 en todas las peticiones | Verificar formato del token | Guía Testing test E.1 |

---

## 📊 Progreso de Integración

Usa este checklist para trackear tu progreso:

- [ ] **Configuración** (30 min)
  - Variables de entorno
  - Verificar conexión con backend

- [ ] **Autenticación** (1-2 horas)
  - Login
  - Logout
  - Refresh token
  - Registro

- [ ] **Actividades** (2-3 horas)
  - Listar
  - Crear
  - Editar
  - Eliminar

- [ ] **Participantes** (2 horas)
  - Listar por actividad
  - Registrar asistencia
  - Verificar pagos

- [ ] **Certificados** (1-2 horas)
  - Emitir individual
  - Emitir masivo
  - Descargar
  - Validar

- [ ] **Inscripciones** (1 hora)
  - Ver disponibles
  - Inscribirse
  - Pagar

- [ ] **Testing Completo** (2-3 horas)
  - Tests por módulo
  - Tests de errores
  - Validación final

---

## 🎓 Términos del Proyecto

- **Actividad:** Curso, taller, conferencia, etc.
- **Participante:** Usuario inscrito en una actividad
- **Organizador:** Usuario que gestiona actividades
- **Inscripción/Enrollment:** Registro de un participante en una actividad
- **Certificado:** Documento digital emitido al completar una actividad

---

## ✅ Listo para Producción

Antes de dar por finalizada la integración, verifica:

- [ ] Todos los endpoints críticos funcionan
- [ ] Manejo de errores implementado
- [ ] Testing completo ejecutado
- [ ] Documentación de bugs/issues creada
- [ ] Variables de entorno documentadas
- [ ] README actualizado con instrucciones de setup
- [ ] Equipo notificado de cambios

---

## 📝 Notas Importantes

1. **Mock API:** Asegúrate de tener `VITE_USE_MOCK_API=false` en producción
2. **Error de typo:** El directorio `desingSystem` debería ser `designSystem`
3. **Refresh Token:** Implementado pero puede necesitar ajustes según backend
4. **CORS:** Debe estar configurado en el backend para permitir el origen del frontend

---

**¡Éxito con la integración!** 🚀

Si encuentras problemas no documentados, actualiza estos documentos para el próximo integrador.
