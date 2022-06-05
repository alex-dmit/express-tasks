FROM node:16
# RUN openssl version -v
# RUN uname -a
# ARG DATABASE_URL
# ENV DATABASE_URL $DATABASE_URL
# RUN echo $DATABASE_URL

# Create app directory
WORKDIR /app

# Install prisma for the migration
RUN npm install -g prisma --unsafe-perm

# Copy schema and migration folder
ADD ./ ./prisma/

# RUN prisma migrate deploy
# CMD [ "prisma", "migrate", "deploy" ]