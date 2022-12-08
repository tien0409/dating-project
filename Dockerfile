FROM node:16-alpine
WORKDIR /app/client
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
