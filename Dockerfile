FROM node:21
WORKDIR /usr/src/app
COPY . .
RUN apt-get update && apt-get install -f -y postgresql-client
RUN yarn install
EXPOSE 3000
CMD ["./start.sh"]
