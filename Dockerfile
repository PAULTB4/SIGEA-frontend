FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Las variables VITE_ deben estar disponibles en build time
ARG VITE_API_URL
ARG VITE_USE_MOCK_API
ARG VITE_ENV
ARG VITE_VERSION
ARG VITE_ENABLE_LOGS
ARG VITE_API_TIMEOUT

# Exportarlas como variables de entorno para el build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCK_API=$VITE_USE_MOCK_API
ENV VITE_ENV=$VITE_ENV
ENV VITE_VERSION=$VITE_VERSION
ENV VITE_ENABLE_LOGS=$VITE_ENABLE_LOGS
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]