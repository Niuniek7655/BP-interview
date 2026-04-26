FROM node:21.6.1
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Ustaw zmienną środowiskową dla API URL (backend w docker-compose)
ENV NEXT_PUBLIC_API_URL=http://localhost:8080

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]