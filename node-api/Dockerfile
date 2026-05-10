FROM node:20-alpine

# Adicione esta linha para instalar as dependências do Prisma no Alpine
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . ./
RUN npx prisma generate

EXPOSE 3000
CMD ["node", "app.js"]