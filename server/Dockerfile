FROM node:12.19.1-buster-slim

ENV NODE_ENV=production
WORKDIR /usr/src/app

# npm ci modules and build
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]
