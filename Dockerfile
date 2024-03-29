FROM node:16-alpine

# Copy files as a non-root user. The 'node' user is built in the Node image.
WORKDIR /usr/src/app
RUN chown node:node ./
USER node

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY package.json package-lock.json* /usr/src/app/
RUN npm ci && npm cache clean --force
COPY . /usr/src/app


CMD ["node", "/usr/src/app/server.js"]

EXPOSE 3000