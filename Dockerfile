FROM node

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
# We do this first so that we can take advantage of Docker’s cache layers.
COPY package*.json /app/

# Install app dependencies
RUN npm install

# Install app dependencies
COPY . /app

# Expose the port the app runs in
# This expose the port to our local machine. This is just doc, it doesn't actually do anything.
# we need to add the extra flat -p 80:80 to actually expose the port to the outside world
EXPOSE 80

CMD ["node", "index.js"]