# STAGE 1
FROM node:12-alpine as builder
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
COPY . .
RUN npm run build

# RUN npm run migrate
# RUN npx sequelize db:seed:all; exit 0
# RUN npm un sequelize-cli

EXPOSE 5000
CMD [ "node", "build/app.js" ]