### STAGE 1 : BUILD ###
FROM node:lts-alpine3.18 AS build
WORKDIR /usr/local/app
COPY ./simpledocs /usr/local/app/
RUN npm install -g @angular/cli
RUN npm install
RUN ng build
 
### STAGE 2 : SERVE ###
FROM node:lts-alpine3.18
COPY --from=build /usr/local/app/dist /dist
 
EXPOSE 4000
 
ENTRYPOINT ["node", "dist/simpledocs/server/server.mjs"]
