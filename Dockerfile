FROM node:lts-alpine
ENV NODE_ENV=production
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /app
COPY package*.json ./
# USER node
RUN npm install --production --silent --ignore-scripts
COPY --chown=node:node . .
EXPOSE 3000
RUN npx prisma generate
CMD [ "node", "app.js" ]