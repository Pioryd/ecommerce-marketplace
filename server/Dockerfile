FROM node:12-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


FROM base as production
WORKDIR /app
COPY --from=base /app ./
EXPOSE 8080
CMD [ "npm", "run", "start" ]

FROM base as test
WORKDIR /app
COPY --from=base /app ./
CMD [ "npm", "run", "test" ]

FROM node:12-alpine AS development
WORKDIR /app
EXPOSE 8080
RUN npm install
CMD [ "npm", "run", "dev" ]

