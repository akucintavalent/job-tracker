FROM node:21
WORKDIR /usr/src/app
# separate COPY commands cause a problem with the first DB migration
# (TypeORM doesn't see the migration to run when the `docker compose up' command is called for the first time)
#COPY package.json yarn.lock ./
#RUN yarn install
COPY . .
RUN yarn install && yarn build
RUN apt-get update && apt-get install -f -y postgresql-client
EXPOSE 3000
CMD ["./start.sh"]
