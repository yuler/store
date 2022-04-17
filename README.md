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
└── README.md
```

## Tech Stacks

- [PNPM](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [WeChat Miniprogram](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## Develop Guide

- `pnpm install` # Install dependencies
- `copy .env.example .env` # Setup environment variable

### apps/mini

- `pnpm run --filter mini ide open` # Open the WeChat Devtool IDE
- `gh secret set MP_PRIVATE_KEY < apps/mini/private.xxx.key` # Upload key to GitHub Secret

<!--
TODO:
## CI/CD
-->
