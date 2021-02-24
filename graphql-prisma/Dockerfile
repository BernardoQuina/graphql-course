FROM node:14

WORKDIR /user/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.production .env

RUN npx prisma generate

RUN yarn build

ENV NODE_ENV production

RUN npx prisma migrate deploy --preview-feature

EXPOSE 8080
CMD [ "node","dist/index.js" ]
USER node