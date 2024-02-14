FROM node:21
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN apt-get update && apt-get install -f -y postgresql-client
EXPOSE 3000
CMD ["./start.sh"]
