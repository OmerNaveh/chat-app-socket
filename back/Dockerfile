FROM node:16-alpine3.12

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 4000

CMD ["npm", "run", "start"]