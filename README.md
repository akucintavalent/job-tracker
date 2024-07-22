## Prerequisites
1. Node 21
2. Docker

## Start Postgres DB
```bash
docker compose up postgres_dev
```

## Build API
```bash
yarn install
```

## Configuration
Create `.env` file in the root directory. Copy and populate all content from `.env.example` file.

## Run DB migration
You might need to run the app before running this command.

```bash
yarn run typeorm migration:run -d src/data-source.ts
```

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## How to
### Create a new DB migration
```bash
yarn run typeorm migration:generate src/migrations/{name} -d src/data-source.ts
```
### Revert the last migration
```bash
yarn run typeorm migration:revert -- -d src/data-source.ts
```
