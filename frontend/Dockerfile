FROM node:20

COPY ./package.json /myfolder/frontend/
COPY ./package-lock.json /myfolder/frontend/
WORKDIR /myfolder/frontend
RUN npm install

COPY . /myfolder/frontend/

CMD npm start