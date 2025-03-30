FROM node:18-alpine

WORKDIR /app

COPY client/package.json client/package-lock.json ./

RUN npm install

COPY client/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]