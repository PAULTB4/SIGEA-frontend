# ⚡ Guía Rápida de Integración - INICIO EN 1 HORA

## 🎯 Objetivo
Conectar el frontend con tu backend API y tener el login funcionando en **menos de 1 hora**.

---

## ✅ PRE-REQUISITOS

Antes de empezar, asegúrate de tener:
- [ ] Backend corriendo (ej: `http://localhost:8080`)
- [ ] Documentación de la API del backend
- [ ] Credenciales de prueba (usuario/password)
- [ ] Node.js instalado
- [ ] Dependencias instaladas (`npm install`)

---

## 🚀 PASO 1: Configurar Variables de Entorno (5 min)

### Crear archivo `.env.development`

En la raíz del proyecto, crea el archivo `.env.development`:

```bash
# URL del backend (CAMBIAR según tu setup)
VITE_API_URL=http://localhost:8080/api/v1

# Timeout en milisegundos
VITE_API_TIMEOUT=30000

# Desactivar API Mock (IMPORTANTE)
VITE_USE_MOCK_API=false

# Activar logs para debugging
VITE_ENABLE_LOGS=true
```

### Validar configuración

1. Abre `src/config/api.config.js`
2. Verifica que las variables se carguen:
   ```javascript
   const API_CONFIG = {
     BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
     // ...
   };
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre consola del navegador y verifica que no haya errores de configuración

---

## 🔐 PASO 2: Integrar Login (20 min)

### 2.1 Verificar Endpoint con Backend

**Pregunta al equipo de backend:**
- ¿Cuál es el endpoint de login? (esperado: `POST /usuarios/auth/login`)
- ¿Qué campos enviar? ¿`correo` o `email`?
- ¿Cómo viene el token en la respuesta?

### 2.2 Ajustar authService.js

Abre `src/services/authService.js` y busca la función `login` (línea 16).

**Verifica estos puntos:**

```javascript
// Línea 24: ¿La URL es correcta?
const apiResponse = await apiClient.post(
  `${API_BASE_URL}/usuarios/auth/login`,  // ← VERIFICAR
  {
    correo: email,        // ← ¿Es 'correo' o 'email'?
    password: password,   // ← ¿Es 'password' o 'contrasena'?
    mantenerSesion: rememberMe  // ← ¿Se usa este campo?
  }
);
```

**Ajusta según respuesta del backend:**

```javascript
// Si el backend responde diferente, ajusta:
const token = backendData.extraData?.accessToken ||  // Opción 1
              backendData.extraData?.tokenUsuario || // Opción 2
              backendData.token;                     // Opción 3
```

### 2.3 Verificar Estructura del Token JWT

El backend debe devolver un JWT con esta estructura:

```json
{
  "usuarioId": "123",
  "roles": ["participante"],  // ← Debe ser un ARRAY
  "exp": 1234567890,
  "iat": 1234567890
}
```

**Si el rol NO viene como array:**

En `authService.js` línea 76, ajusta:

```javascript
// Si viene como string directo
if (decoded.role) {
  userRole = decoded.role;
} else if (decoded.roles && Array.isArray(decoded.roles)) {
  userRole = decoded.roles[0];
}
```

### 2.4 Probar Login

1. Inicia el dev server: `npm run dev`
2. Ve a `http://localhost:5173/auth`
3. Intenta hacer login con credenciales de prueba
4. **Abre DevTools → Network → XHR**
5. Busca la petición `POST /usuarios/auth/login`
6. Verifica:
   - Request body se envía correctamente
   - Response tiene status 200
   - Token se recibe correctamente
7. **Abre Application → LocalStorage**
8. Verifica que se guardó:
   - `authToken`
   - `userRole`
   - `userEmail`

**Si funciona:** ✅ Deberías ser redirigido al dashboard  
**Si NO funciona:** Ver sección de "Problemas Comunes" abajo

---

## 🌐 PASO 3: Configurar CORS (si hay error) (10 min)

### Síntoma: Error de CORS en consola

```
Access to XMLHttpRequest at 'http://localhost:8080/...' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

### Solución

**Contacta al equipo de backend** y pídeles que agreguen en la configuración de CORS:

```java
// Ejemplo en Spring Boot
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173")  // ← Frontend Vite
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

## 📊 PASO 4: Probar Dashboard (15 min)

Una vez que el login funciona:

### 4.1 Dashboard del Participante

1. Loguéate con un usuario participante
2. Deberías ver: `http://localhost:5173/participant/dashboard`
3. **Abre consola y busca errores**
4. Verifica qué endpoints se llaman automáticamente

**Endpoints esperados:**
- `GET /usuarios/participante/home` (estadísticas)
- `GET /participants/enrollments` (inscripciones)

### 4.2 Ajustar Endpoints del Dashboard

Si los endpoints son diferentes:

1. Abre `src/services/participantService.js`
2. Ajusta las URLs (líneas 47, 74, 101, etc.)
3. Ajusta estructuras de respuesta si es necesario

---

## 🧪 PASO 5: Testing Básico (10 min)

### Test 1: Login + Logout

- [ ] Login exitoso → Redirige al dashboard
- [ ] Logout → Redirige a `/` y limpia localStorage
- [ ] Login con credenciales incorrectas → Muestra error

### Test 2: Token en Headers

1. Loguéate
2. Abre DevTools → Network
3. Haz cualquier acción que llame a la API
4. Verifica que el request tenga el header:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Test 3: Refresh Token (Opcional por ahora)

- [ ] Esperar a que el token expire o forzar un 401
- [ ] Verificar que se intente hacer refresh automáticamente

---

## ⚠️ PROBLEMAS COMUNES

### 1. Login devuelve 401 aunque las credenciales son correctas

**Causas posibles:**
- Campo `correo` vs `email` mal nombrado
- Password necesita encriptación en frontend (poco común)
- Backend espera header adicional

**Solución:**
- Verifica con Postman/Insomnia primero
- Compara request del frontend vs Postman

---

### 2. Token no se envía en las peticiones

**Síntoma:** Todas las peticiones después del login devuelven 401

**Solución:**
1. Verifica que el token se guardó: `localStorage.getItem('authToken')`
2. Revisa `src/services/axiosConfig.js` línea 44:
   ```javascript
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   ```
3. Verifica en Network que el header se agregue

---

### 3. CORS Error

**Ver PASO 3 arriba**

---

### 4. Rol no se reconoce correctamente

**Síntoma:** Usuario loguea pero no puede acceder a su dashboard

**Solución:**
1. Decodifica el token manualmente en [jwt.io](https://jwt.io)
2. Verifica el campo `roles` o `role`
3. Ajusta extracción en `authService.js` líneas 76-83
4. Verifica mapeo de roles en `AppRouter.jsx` líneas 22-32

---

### 5. Refresh Token loop infinito

**Síntoma:** La app hace peticiones de refresh continuamente

**Solución:**
1. Verifica que el nuevo token se guarde correctamente
2. Revisa `axiosConfig.js` línea 132:
   ```javascript
   localStorage.setItem('authToken', newToken);
   ```
3. Asegúrate que el flag `_retry` se setee (línea 98)

---

## 📋 CHECKLIST DE "LISTO PARA CONTINUAR"

Antes de avanzar a otros módulos, verifica:

- [ ] Login funciona con credenciales reales
- [ ] Token se guarda en localStorage
- [ ] Token se envía en headers de peticiones
- [ ] Dashboard se carga sin errores 500
- [ ] Logout funciona correctamente
- [ ] CORS no está bloqueando peticiones

---

## 🎯 PRÓXIMOS PASOS

Una vez que el login funciona:

1. **Integrar módulo de Actividades** (ver `checklist_integracion.md` Fase 3)
2. **Integrar módulo de Participantes** (ver Fase 4)
3. **Integrar módulo de Certificados** (ver Fase 5)

---

## 📞 AYUDA RÁPIDA

### Comandos útiles

```bash
# Ver logs del servidor
npm run dev

# Limpiar cache de vite
rm -rf node_modules/.vite

# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Debugging en navegador

```javascript
// En consola del navegador
localStorage.getItem('authToken')  // Ver token
localStorage.clear()                // Limpiar todo
```

### Verificar configuración

```javascript
// En consola del navegador (mientras dev server corre)
import.meta.env.VITE_API_URL  // Ver URL base
```

---

## 🔥 CONSEJOS PRO

1. **Usa React DevTools** para ver el estado de `AuthProvider`
2. **Usa Redux DevTools** si el proyecto lo tiene (no parece tenerlo)
3. **Compara con Postman:** Si algo no funciona, prueba el endpoint en Postman primero
4. **Logs everywhere:** Agrega `console.log` en servicios para ver qué datos llegan
5. **Documenta cambios:** Anota qué ajustaste para informar al equipo

---

## ⏱️ Tiempo estimado total: 1 hora

- Configuración: 5 min
- Login: 20 min
- CORS (si aplica): 10 min
- Dashboard: 15 min
- Testing: 10 min

**¡Éxito!** 🚀
