# BUILD STAGE
FROM node:18.17.1 AS BUILD_IMAGE
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# PRODUCTION STAGE
FROM node:18.17.1 AS PROD_IMAGE
WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

COPY package.json .
COPY vite.config.js .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "preview"]