#!/bin/bash

docker-compose -f "docker-compose.migrate.yml" up -d --build --force-recreate

docker-compose -f "docker-compose.yml" up -d --build