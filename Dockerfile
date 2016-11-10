FROM jkilbride/node-npm-alpine:7.1.0
RUN mkdir app
WORKDIR app
ADD https://github.com/329379172/online-log/archive/master.zip master.zip
RUN unzip master.zip && rm -f master.zip
RUN mv online-log-master/* ./
RUN apk --update add python make gcc
RUN npm update npm -g
RUN npm install webpack -g
RUN npm install
RUN npm run build-client
RUN apk del python make gcc
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]