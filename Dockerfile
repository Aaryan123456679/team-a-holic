FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm build

EXPOSE 3001

CMD npm run start
CMD npx convex dev