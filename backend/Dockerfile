FROM node:18 AS development

ENV NODE_ENV=development

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm ci

COPY . .

# Install netcat for the database wait script
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Make the entrypoint script executable
RUN chmod +x docker-entrypoint.sh

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
