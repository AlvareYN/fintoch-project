FROM node:16
WORKDIR /usr/src/app
COPY . ./

RUN npm install
RUN npm run build
ENV NODE_ENV=prod
EXPOSE 3000
CMD ["node", "./build"] 

