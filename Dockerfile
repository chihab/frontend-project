FROM node:20

RUN npm install -g pnpm http-server json-server

WORKDIR /app

COPY . /app
RUN pnpm install --frozen-lockfile
RUN pnpm lint
RUN pnpm test
RUN pnpm build

CMD http-server dist/apps/dashboard -p 8081 & \
    http-server dist/apps/admin/browser -p 8082 & \
    json-server apis/users/db.json & \
    PORT=3001 node dist/apis/fred-proxy
    