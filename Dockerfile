FROM node:20 as build-stage
ARG PORT
ARG VITE_LOCAL_SERVER_API_BASE_DOMAIN
ENV VITE_LOCAL_SERVER_API_BASE_DOMAIN=$VITE_LOCAL_SERVER_API_BASE_DOMAIN
WORKDIR /usr/src/app

COPY package*.json ./
COPY public ./public/
COPY index.html ./
COPY src ./src/
COPY *.mjs ./
COPY *.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tsconfig.app.json ./
COPY tsconfig.app.tsbuildinfo ./
COPY vite.config.dev.ts ./
COPY vite.config.prod.ts ./

RUN npm install
RUN npm run build

FROM nginx:1.25.2-alpine

COPY --from=build-stage /usr/src/app/dist/ /var/www/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
