FROM node:18-alpine

WORKDIR /app

COPY server/package.json server/package-lock.json ./

RUN npm install

COPY server/ .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]