# store

> A store

[![PNPM Badge](https://img.shields.io/badge/developed%20by-pnpm-black)](https://pnpm.io/)

<!--
TODO:
## Features

![体验版二维码](apps/mini/shots/mini-trial-qrcode.jpeg)
-->

## Struct

```bash
/
├── apps
│   │── api # Backend API
│   └── mini # WeChat Miniprogram
├── packages
│   └── shared # Share Utils
└── prisma # Prisma Configs
```

## Tech Stacks

- [PNPM](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [WeChat Miniprogram](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Windi CSS](https://windicss.org/)
- [nestjs](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)

## Develop Guide

- `pnpm install` # Install dependencies
- `copy .env.example .env` # Setup environment variable

### apps/mini

- `pnpm run --filter mini ide open` # Open the WeChat Devtool IDE
- `gh secret set MP_PRIVATE_KEY < apps/mini/private.xxx.key` # Upload key to GitHub Secret

### apps/api

- `docker-compose up -d` # Up DB service
- `pnpm run --filter api db:generate` # Prisma Generate Artifacts
- `gh secret set -f .env` # Upload `.env` to GitHub Secret

## Q/A

- `docker pull --platform linux/amd64 mysql` # For M1 Mac

## Refs

- [Sequel Ace](https://github.com/Sequel-Ace/Sequel-Ace) Database Management Application

<!--
TODO:

## CI/CD

-->
