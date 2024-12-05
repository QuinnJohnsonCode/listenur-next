# Development image
FROM node:18-alpine AS dev
WORKDIR /app
COPY ./listenur/package.json ./listenur/package-lock.json ./
RUN npm install
COPY ./listenur ./
EXPOSE 3000
CMD ["npm", "run", "dev"]