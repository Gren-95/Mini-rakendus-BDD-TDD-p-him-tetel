FROM node:20-alpine

WORKDIR /app

# Kopeeri package failid
COPY package*.json ./

# Paigalda sõltuvused
RUN npm ci

# Kopeeri koodi
COPY . .

# Käivita testid
CMD ["npm", "run", "ci"]

