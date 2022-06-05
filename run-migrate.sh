#!/bin/bash

# docker-compose -f "docker-compose.migrate.yml" up -d --build

# docker-compose -f "docker-compose.migrate.yml" down
docker-compose -f "docker-compose.migrate.yml" build --no-cache
docker-compose -f "docker-compose.migrate.yml" up -d