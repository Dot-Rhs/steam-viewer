FROM node:19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
RUN npm i
CMD ["npm", "run" ,"dev"]