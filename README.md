# store

> A store

[![PNPM Badge](https://img.shields.io/badge/developed%20by-pnpm-black)](https://pnpm.io/)

<!--
TODO:
## Features

![体验版二维码](./shots/mini-trial-qrcode.jpeg)
-->

## Struct

```bash
/
├── apps
│   │── api # Backend API
│   └── mini # WeChat Miniprogram
├── packages
│   └── shared # Share Utils
│── prisma # Prisma Configs
└── shots # Screen Shots
```

## Tech Stacks

- [PNPM](https://pnpm.io/)
- [Turbo](https://turborepo.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [WeChat Miniprogram](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Windi CSS](https://windicss.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)

## Develop Guide

- `pnpm install` # Install dependencies
- `copy .env.example .env` # Setup environment variable
- `pnpm run db:generate` # Prisma Generate Artifacts
- `pnpm run db:deploy` # Prisma Migrate deploy

### apps/mini

- `pnpm run --filter mini ide open` # Open the WeChat Devtool IDE
- `gh secret set MINI_PRIVATE_KEY < apps/mini/private.xxx.key` # Upload key to GitHub Secret

### apps/api

- `docker-compose up -d` # Up DB service
- `gh secret set -f .env` # Upload `.env` to GitHub Secret

## Q/A

- `docker pull --platform linux/amd64 mysql` # For M1 Mac

## Refs

- [Sequel Ace](https://github.com/Sequel-Ace/Sequel-Ace) Database Management Application

<!--
TODO:

## CI/CD

-->
