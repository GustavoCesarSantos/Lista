FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD NODE_URLS=http://*:$PORT npm start
