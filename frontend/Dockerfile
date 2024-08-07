# Use the official Node.js 16 image as a parent image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the entire project to the working directory
COPY . .

# Install project dependencies
RUN npm install

RUN npm -g install serve

RUN npm run build

EXPOSE 80

# Start Nginx server
CMD serve -s build -l 80