#!/bin/bash

docker-compose -f "docker-compose.migrate.yml" up -d --build

docker-compose -f "docker-compose.yml" up -d --build