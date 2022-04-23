# Aliyun CentOS 8

> 阿里云 CentOS 8

TODO: Move to Docker

## Update yum source

```bash
mkdir /etc/yum.repos.d.origin
mv /etc/yum.repos.d/* /etc/yum.repos.d.origin
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
yum install net-tools -y
```

## Install

```bash
yum install git
yum install mysql-server
yum install nginx
sudo systemctl start mysqld
sudo systemctl start nginx
```

## Host

```bash
15.164.81.167 github.com
52.74.223.119 github.com
```

## Install pnpm

```bash
curl -fsSL https://get.pnpm.io/install.sh | PNPM_VERSION=7.0.0-rc.7 sh -
source ~/.bashrc
pnpm env use --global 16
pnpm install pm2 -g
```

## Manual Update

```bash
git pull origin main
pnpm install
pnpm run db:generate
pnpm run db:migrate
pnpm --filter api run build
pnpm --filter api run start:prod
# Setup pm2
pm2 start apps/api/dist/main.js --name api
pm2 startup systemd
pm2 save
```

## Setup Nginx
