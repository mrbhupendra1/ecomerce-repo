# Step 1: Base image
FROM node:18

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy application code
COPY . .

# Step 5: Expose port (jo tumhara server.js use karega, mostly 3000)
EXPOSE 3000

# Step 6: Run application
CMD ["node", "server.js"]
