FROM node:18-alpine

WORKDIR /app

RUN apk update && \
    apk add --no-cache yarn

ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

ADD . /app

CMD ["yarn", "start"]
