#!/bin/bash

# docker-compose -f "docker-compose.migrate.yml" up -d --build --force-recreate
docker-compose -f "docker-compose.migrate.yml" down
docker-compose -f "docker-compose.migrate.yml" build --no-cache
docker-compose -f "docker-compose.migrate.yml" up -d

docker-compose -f "docker-compose.yml" up -d --build