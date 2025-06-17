FROM node:22.16-slim AS application_installer

WORKDIR /app
COPY . .
RUN npm ci

FROM node:22.16-slim AS builder

WORKDIR /app
COPY --from=application_installer /app .

RUN apt-get update \
 && apt-get install -y sqlite3 \
 && rm -rf /var/lib/apt/lists/*

RUN touch /app/drivedb.sqlite

RUN mkdir /app/uploads

RUN cat <<EOF > /app/.env
DATABASE_URL="file:///app/drivedb.sqlite"
SECRET_PASSWORD_KEY="MyS3ctr3t*"
EOF

RUN npm run db:generate
RUN npm run db:migrate
RUN npm run seed

EXPOSE 3000
CMD ["npm", "run", "start"]
