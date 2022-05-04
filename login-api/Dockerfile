FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
COPY dist ./


ENV JWT_SECRET=holamundooo
ENV PORT=4000
ENV DATABASE_HOST=172.18.0.2


RUN npm install ci --only=production

EXPOSE 4000


CMD [ "node", "main.js" ]