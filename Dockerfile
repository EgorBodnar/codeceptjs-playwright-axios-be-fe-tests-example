FROM mcr.microsoft.com/playwright:latest

WORKDIR usr/src/test

RUN npm install --global yarn

COPY package.json .

RUN yarn install

COPY . .

ENTRYPOINT ["yarn"]

CMD ["ci:test"]
