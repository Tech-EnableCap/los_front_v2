# Pull latest official node image
FROM node:latest

# Expose ports
EXPOSE 3000
EXPOSE 35729

# Set working directory
WORKDIR /app1

# Add /app/node_modules/.bin to environment variables
ENV PATH /app1/node_modules/.bin:$PATH

# Copy package files and install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
#RUN npm install react-scripts -g

# Add React app to working directory
ADD . /app1

# Start the React app
CMD ["npm", "start"]
