#!/bin/bash

docker-compose build

sleep 30 && docker exec -it node_1 ./cockroach init --insecure &

docker-compose up