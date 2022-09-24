FROM node:16.15.0
WORKDIR /home/frontend

COPY package.json package-lock.json ./
RUN npm install
#RUN npm install react-scripts@3.4.1 -g
COPY . ./
#EXPOSE 3000