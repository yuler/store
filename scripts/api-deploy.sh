#!/usr/bin/env bash

git pull origin main
pnpm --filter api build
pm2 restart api