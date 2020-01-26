FROM node:10 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src src
COPY './config.js' .

CMD ["node", "src/main.js"]
