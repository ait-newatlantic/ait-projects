FROM node:12.19.1-buster-slim

ENV SKIP_PREFLIGHT_CHECK=true
ENV NODE_ENV=production

ARG REACT_APP_BASE_URL=${REACT_APP_BASE_URL}

WORKDIR /usr/src/app

# install serve
RUN npm install -g serve

# npm ci modules and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "serve", "-s", "build", "-l", "3000" ]
