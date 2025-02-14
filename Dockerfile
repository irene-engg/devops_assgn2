# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if applicable)
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the port that the app will listen on
EXPOSE 3000

# Command to run the application using pnpm
CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
