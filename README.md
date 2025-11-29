# SIGEA - Sistema Integral de Gestión de Eventos Académicos

Sistema web desarrollado para la Universidad Nacional Agraria de la Selva (UNAS) que automatiza la gestión completa de eventos académicos: inscripciones, pagos, generación y validación de certificados digitales.

## 🚀 Características

- ✅ Landing page moderna y responsiva
- ✅ Gestión de programas y eventos académicos
- ✅ Sistema de certificación digital
- ✅ Validación de certificados
- ✅ Testimonios de usuarios
- ✅ Diseño con Tailwind CSS 3
- ✅ Animaciones fluidas con React

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** (viene con Node.js)
- **Git** (opcional, para clonar el repositorio)

Verifica las instalaciones:
```bash
node --version
npm --version
```

## 🛠️ Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd sigea
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Tailwind CSS 3

Si encuentras errores con Tailwind, ejecuta:

```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4.1 postcss@^8.4.35 autoprefixer@^10.4.18
```

### 4. Verificar archivos de configuración

**postcss.config.js** debe tener:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tailwind.config.js** debe tener:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**src/styles/index.css** debe tener:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🚀 Ejecutar el proyecto

### Modo desarrollo

```bash
npm start
```

El proyecto se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

### Compilar para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `/build`

## 📁 Estructura del Proyecto

```
sigea/
├── public/              # Archivos públicos estáticos
├── src/
│   ├── api/            # Hooks personalizados y lógica de API
│   │   └── sigeaHooks.jsx
│   ├── components/     # Componentes reutilizables
│   │   └── common/
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   ├── pages/          # Páginas de la aplicación
│   │   └── landing/
│   │       ├── landingPage.jsx
│   │       ├── heroSection.jsx
│   │       ├── aboutSection.jsx
│   │       ├── programSection.jsx
│   │       ├── certificationsSection.jsx
│   │       └── reviewsSections.jsx
│   ├── styles/         # Estilos globales
│   │   └── index.css
│   ├── app.jsx         # Componente principal
│   └── index.js        # Punto de entrada
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Paleta de Colores

- **Primary Blue**: `#598AEB`
- **Secondary Green**: `#59C87B`
- **Accent Mint**: `#59EBBF`
- **Accent Light**: `#A7D3EB`
- **Dark**: `#0F172A`
- **Text**: `#1E293B`
- **Background**: `#F4F8FA`

## 🔧 Tecnologías Utilizadas

- **React** 19.2.0
- **React Router DOM** 7.9.5
- **Axios** 1.13.1
- **Lucide React** 0.548.0 (iconos)
- **Tailwind CSS** 3.4.1
- **React Scripts** 5.0.1

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm test` - Ejecuta las pruebas
- `npm run build` - Compila el proyecto para producción
- `npm run eject` - Expone la configuración de webpack (⚠️ irreversible)

## 🐛 Solución de Problemas Comunes

### Error: "Module build failed" con Tailwind

**Causa**: Incompatibilidad entre Tailwind 4 y Create React App

**Solución**:
```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4.1
rm -rf node_modules package-lock.json
npm install
npm start
```

### Error: "Cannot find module"

**Solución**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Estilos de Tailwind no se aplican

**Verifica**:
1. Que `@tailwind` esté en `src/styles/index.css`
2. Que `index.css` esté importado en `src/index.js`
3. Reinicia el servidor con `npm start`

## 🚀 Próximas Funcionalidades

- [ ] Sistema de autenticación
- [ ] Dashboard de administrador
- [ ] Integración con pasarela de pagos
- [ ] Generación automática de certificados PDF
- [ ] Sistema de notificaciones por email
- [ ] API REST backend

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto fue desarrollado para la Universidad Nacional Agraria de la Selva (UNAS).

## 👥 Equipo de Desarrollo

Proyecto desarrollado como parte del curso de Gestión de Proyectos de TI - Ciclo 6

## 📞 Soporte

Para reportar problemas o solicitar características, abre un issue en el repositorio.

---

**Nota importante**: Este proyecto usa Create React App, que solo es compatible con Tailwind CSS 3. No intentes usar Tailwind CSS 4 ya que causará errores de compilación.