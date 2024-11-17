FROM node

COPY . /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]