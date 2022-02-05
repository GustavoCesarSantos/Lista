FROM node:14
WORKDIR /app
COPY . .
RUN npm install --only=prod
CMD NODE_URLS=http://*:$PORT npm start