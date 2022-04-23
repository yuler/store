#!/usr/bin/env bash

git pull origin main
pnpm install
pnpm run db:generate
pnpm run db:migrate
pnpm --filter api build
pm2 restart api