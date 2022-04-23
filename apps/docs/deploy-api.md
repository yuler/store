# Deploy API

> This guide is operated in [ECS(CentOS 8)](https://www.aliyun.com/product/ecs) on [aliyun](https://aliyun.com/)

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

```bash
vim /etc/nginx/conf.d/api.conf
```

```nginx
server {
    listen  80;
    server_name api.xxx.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header    Host              $host;
        proxy_set_header    X-Real-IP         $remote_addr;
        proxy_set_header    X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-SSL on;
        proxy_set_header    X-NginX-Proxy true;
    }
}
```

## Install TLS

### certbot

> https://certbot.eff.org/

```bash
# Install snap
sudo dnf install epel-release
sudo dnf upgrade
sudo yum install snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
# Install certbot
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
# Setup with nginx
sudo certbot --nginx
# Test automatic renewal
sudo certbot renew --dry-run
```

### acme.sh

> https://wiki.acme.sh

```bash
curl https://get.acme.sh | sh -s email=is.yuler@gmail.com
~/.acme.sh/acme.sh --issue -d api.yuler.arkmark.cn --nginx
~/.acme.sh/acme.sh --install-cert -d api.yuler.arkmark.cn \
--key-file       /etc/nginx/conf.d/api.key.pem  \
--fullchain-file /etc/nginx/conf.d/api.cert.pem \
--reloadcmd     "service nginx force-reload"
# Manually configure certificates on nginx
```
