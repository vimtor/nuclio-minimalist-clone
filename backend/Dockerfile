FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

ENV PORT=3001
EXPOSE ${PORT}

CMD ["npm", "start"]
