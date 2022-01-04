##
##  Copyright 2021 neko.rs contributors <https://neko.rs>
##
##  Licensed with GNU Affero General Public License v3.0 or later
##

# Define global arguments
ARG PROJECT="nekocss"

####################

FROM node:alpine

# Create the project directory and switch to it
ARG PROJECT
RUN mkdir ${PROJECT}
WORKDIR /${PROJECT}

# Copy package.json and use it to install dependencies
COPY package.json package.json
RUN npm install

# Copy the rest of the needed files
COPY gulpfile.js gulpfile.js
COPY src src

# Build unpurged css
RUN npx -y gulp build