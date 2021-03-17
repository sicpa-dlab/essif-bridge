FROM node:15.11.0 as build

# ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm install -g npm@latest

WORKDIR /app

# install dependencies
COPY package.json ./
COPY yarn.lock ./

# add app
COPY ./packages ./packages

#RUN yarn config delete https-proxy
#RUN yarn config delete proxy

RUN yarn
RUN yarn workspace bridge-shared-components build
RUN yarn workspace essif-main build
RUN yarn workspace essif-issuer build
RUN yarn workspace essif-verifier build


# production environment
FROM nginx:stable-alpine
COPY --from=build /app/packages/essif-main/build /usr/share/nginx/html

# verifier
COPY --from=build /app/packages/essif-verifier/build /usr/share/nginx/verifier

# issuer
COPY --from=build /app/packages/essif-issuer/build /usr/share/nginx/issuer

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]