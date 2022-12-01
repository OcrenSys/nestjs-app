FROM node:18-alpine as base

WORKDIR /usr/src/app
RUN npm cache clean --force
COPY . .
EXPOSE 3000

FROM base as production

ENV NODE_ENV=production
RUN yarn install --production
RUN yarn build
CMD [ "yarn", "start" ]

FROM base as development

ENV NODE_ENV=development
RUN yarn
CMD [ "yarn", "start:dev" ]
