# Mini-Store

**Mini Store** a WeChat MiniProgram.

## Repo Struct

```bash
.
├── ...
├── mp      # MiniProgram client
├── www     # office web site
├── ...
```

## GitHub Actions

- Add label `upload_miniprogram` for trigger `upload_miniprogram` workflow

## Tech Stacks

- [WeChat MiniProgram](https://developers.weixin.qq.com/miniprogram/dev/framework/) for client entry
- [WeChat Cloud](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [WeUI 组件库](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)
- [windicss](https://github.com/windicss/windicss) utility-first CSS framework

## Some Links

- [Tencent Cloud Base](https://console.cloud.tencent.com/tcb)

## WeChat Devtools CLI

- [CLI](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)

> Set alias on Mac

```bash
alias wechatwebdevtools="/Applications/wechatwebdevtools.app/Contents/MacOS/cli"
```

> Example deploy cloud functions by CLI

```bash
wechatwebdevtools cloud functions deploy -r -e test-7grt94kx72509f46 --project $PWD -p $PWD/mp-cloud/all/functions/create-order
```

## Design

- [WeChat MiniProgram on Figma](https://www.figma.com/file/d4hDNZV5GkNjLZdBlNbi2S/WeChat-MiniPorgram)
