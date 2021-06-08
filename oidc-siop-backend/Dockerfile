FROM node:12-alpine as builder
RUN apk add python make g++ && apk update
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build


FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules
COPY --from=builder dist dist
COPY package*.json ./
USER node
ENV NODE_ENV production
CMD [ "node", "dist/main.js" ]