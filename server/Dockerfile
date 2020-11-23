FROM node:12.19.1-buster-slim

WORKDIR /usr/src/app

# npm ci modules and build
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 4000
CMD [ "npm", "run", "start" ]
