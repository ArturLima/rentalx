FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g npm@8.1.3
RUN npm install --legacy-peer-deps
RUN npm install

COPY  . . 

EXPOSE 3333

CMD ["npm","run", "dev"]