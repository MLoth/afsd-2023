###################
# BUILD STAGE
###################

FROM node:20 as build-stage
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node packages/pwa/package*.json ./packages/pwa/
RUN npm ci

# COPY, make sure that /env.production.local is copied as well. Is it excluded from dockerignore?
COPY --chown=node:node packages/pwa packages/pwa

USER node
RUN npm run build -w pwa

# ###################
# # PRODUCTION STAGE
# ###################

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /usr/src/app/packages/pwa/dist /app

COPY nginx.conf /etc/nginx/nginx.conf