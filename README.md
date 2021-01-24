## OVERVIEW
Each folder is its own project in accordance with the course, being graphql-prisma the main project witch is deployed to heroku

## Source of truth & auto-generated files
The source of truth is schema.prisma and as we define object types according to it and the queries, mutations and subscriptions necessary nexus will auto generate a typescript types file (nexus schema) and a graphql file (graphql schema).


### Deploying to heroku
I faced some problems deploying to heroku since the production build was crashing because certain source files need types that come from the node_modules folder but are generated only after the build so basically they needed to be included in the source folder before deployment. That is why the output configuration of nexus and nexus-prisma-plugin is set to the source folder. 