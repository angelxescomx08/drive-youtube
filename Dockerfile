FROM node:22.16-slim AS installer

WORKDIR /app
COPY . .

RUN apt-get update \
 && apt-get install -y sqlite3 \
 && rm -rf /var/lib/apt/lists/*

RUN touch /app/drivedb.sqlite

RUN cat <<EOF > /app/.env
DATABASE_URL="file:///app/drivedb.sqlite"
SECRET_PASSWORD_KEY="MyS3ctr3t*"
EOF

RUN npm install
RUN npm run db:generate
RUN npm run db:migrate

EXPOSE 3000
CMD ["npm", "run", "start"]
