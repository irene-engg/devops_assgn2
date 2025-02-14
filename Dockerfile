# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the src directory and other necessary files into the container
COPY src ./src
COPY routes ./routes
COPY persistence ./persistence
COPY static ./static
COPY .dockerignore ./
COPY cloudbuild.yaml ./
COPY package-lock.json ./
COPY package.json ./

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
