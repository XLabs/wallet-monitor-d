FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY src src

COPY tsconfig.json tsconfig.json

RUN npm install

RUN npm run build

CMD [ "node", "./lib/index.js" ]