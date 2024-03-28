# Use a lightweight Node.js image for building
FROM node:lts-alpine 

# Create app directory
WORKDIR /app

RUN apk update && apk add npm

# Copy source code (excluding node_modules)
COPY . .

# Install dependencies
RUN npm install

# Expose the port your application listens on
EXPOSE 3000

# Start command
CMD [ "npm", "start" ]


# FROM node:10-alpine
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# WORKDIR /home/node/app
# COPY package*.json ./
# USER node
# RUN npm install
# COPY --chown=node:node . .
# COPY app.js .
# EXPOSE 8080
# CMD [ "npm", "start", "-p", "8080" ]