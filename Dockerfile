
################################################
################   Development   ###############
################################################
FROM node:14-alpine3.11  AS development

WORKDIR /usr/src/app

# Copy the package.jsons from host to container
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Here we clean cache and install all the dependencies
RUN yarn cache clean --force
RUN yarn

# Bundle app source / copy all other files
COPY . .

# Expose development and debug ports
EXPOSE 3000 9229

# Build the app to the /dist folder

RUN yarn build


################################################
################   PRODUCTION   ################
################################################
# Build another image named production
FROM node:14-alpine3.11 AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set Working Directory
WORKDIR /usr/src/app

# Copy all from development stage
COPY --from=development /usr/src/app .


# Run production mode app
CMD [ "node", "dist/main" ]


