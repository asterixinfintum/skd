FROM node:18
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
ENV PORT 8001
ENV DB mongodb://db:27017/db
ENV secretKeyJWT placeholder
ENV masterKey placeholder
ENV RSSK placeholder
ENV PLATFORM placeholder
ENV baseurl placeholder
ENV wwwbaseurl placeholder

EXPOSE $PORT
CMD [ "node", "dist/index.js" ]