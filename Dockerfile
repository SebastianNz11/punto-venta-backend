# 1. Imagen base
FROM node:20-alpine

# 2. Crear directorio de trabajo
WORKDIR /usr/src/app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install --production

# 5. Copiar todo el proyecto
COPY . .

# 6. Construir el proyecto
RUN npm run build

# 7. Exponer el puerto que NestJS usará
EXPOSE 3000

# 8. Comando para iniciar la app
CMD ["node", "dist/main.js"]