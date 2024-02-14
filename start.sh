#!/bin/bash
# start.sh

TIMEOUT=15 # TIMEOUT in seconds

echo "Waiting for database connection to $DB_HOST:$DB_PORT..."

# Loop until a successful connection or timeout
timeout_start=$(date +%s)
while :
do
    pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t 1
    result=$?

    echo "pg_isready result: $result"
    if [ $result -eq 0 ]; then
        echo "Database connection established."
        break
    fi

    # Check for timeout
    timeout_current=$(date +%s)
    elapsed_time=$((timeout_current - timeout_start))

    if [ $elapsed_time -ge $TIMEOUT ]; then
        echo "Timeout reached. Unable to establish database connection."
        exit 1
    fi

    echo "Elapsed time: $elapsed_time"
    sleep 1
done

# Connection is established
yarn run typeorm migration:run -d src/data-source.ts
yarn start
