This is a repository of a home project that simulates the work of Twitter. it consists of four parts:
twitter-client: a client that runs on port 1337 and renders incoming messages.
twitter-bot: simulates activity. Gets a list of users from the database and generates a new message every 6 seconds.
twitter-api: layer before twitter-db, uses RabbitMQ to request POST tweet
twitter-db: implements the work with the database

Warning: After running the script, you must enter the command ```docker exec -it node_1 ./cockroach init --insecure``` in another terminal.

## To Run
```
bash script.sh
```

OR

```
1. docker-compose build
2. docker-compose up
```

## To GET Data

```Hit URL http://localhost:1337/```

## To Shutdown

```docker-compose down```