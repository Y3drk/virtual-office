FROM node:18.15.0-alpine
WORKDIR /
ENV PATH /node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install # -g
COPY . .
CMD ["npm", "start"]