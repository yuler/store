#!/usr/bin/env bash

git pull origin main
pnpm install --frozen-lockfile
pnpm run db:generate
pnpm run db:deploy
pnpm --filter api build
pm2 restart api