# 1. Imagen base
FROM node:20-alpine

# 2. Crear directorio de trabajo
WORKDIR /usr/src/app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar todas las dependencias (incluyendo dev)
RUN npm install

# 5. Copiar todo el proyecto
COPY . .

# 6. Construir el proyecto
RUN npm run build

# 7. Limpiar dependencias de desarrollo para producción
RUN npm prune --production

# 8. Exponer el puerto que NestJS usará (soporta Render)
ENV PORT=3000
EXPOSE $PORT

# 9. Comando para iniciar la app
CMD ["node", "dist/main.js"]