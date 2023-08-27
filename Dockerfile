# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/index

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy compiled JavaScript files from the "dist" directory to the container
COPY dist/ ./dist/

# Expose the port that your Express server is listening on
EXPOSE 3000

# Command to run the application using the compiled JavaScript files
CMD [ "node", "dist/index.js" ]
