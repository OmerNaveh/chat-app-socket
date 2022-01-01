FROM node:16-alpine3.12

WORKDIR /front

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start"]

