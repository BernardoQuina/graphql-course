#!/bin/bash

echo What should the version be?
read VERSION
docker build -t bernardoquina/graphql-prisma:$VERSION .
docker push bernardoquina/graphql-prisma:$VERSION
ssh root@165.232.106.15 "docker pull bernardoquina/graphql-prisma:$VERSION && docker tag bernardoquina/graphql-prisma:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"