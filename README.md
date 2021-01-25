## OVERVIEW
Each folder is its own project in accordance with the course, being graphql-prisma the main project which is deployed to heroku

## Prisma 2 Setup
Please read the docs since its quite different from prisma 1:

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres

Note that you don't need docker anymore or to install prisma globally. Instead you install @prisma/cli as dev dependency and invoke prisma via **npx** or **yarn**.

### Prisma Migrate
Also to create database tables via prisma now you need to use prisma migrate but if you are developing against a cloud-based database (for example, on Heroku like we do in the course) and are currently prototyping such that you don't care about generated migration files and only need to apply your Prisma data model to the database schema, you can run **prisma db push** instead of the **prisma migrate dev** command.

## Source of truth & auto-generated files
The source of truth is schema.prisma and as we define object types according to it and the queries, mutations and subscriptions necessary nexus will auto generate a typescript types file (nexus schema) and a graphql file (graphql schema).


### Deploying to heroku
I faced some problems deploying to heroku since the production build was crashing because certain source files need types that come from the node_modules folder but are generated only after the build so basically they needed to be included in the source folder before deployment. That is why the output configuration of nexus and nexus-prisma-plugin is set to the source folder. 