FROM jkilbride/node-npm-alpine:7.1.0
RUN mkdir app
COPY ./* app/
WORKDIR app
RUN npm update npm -g
RUN npm install webpack -g
RUN npm install
RUN npm run build-client
CMD npm start