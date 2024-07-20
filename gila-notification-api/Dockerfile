FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3
RUN npm install

COPY . .

RUN npm run build

RUN npm ci --omit=dev && npm rebuild bcrypt --build-from-source

# CMD ["sh", "-c", "npm run start:with-seed"]
CMD ["npm", "run", "start:with-seed"]

EXPOSE 8080