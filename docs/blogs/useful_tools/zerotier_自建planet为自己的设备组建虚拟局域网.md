---
title: zerotier+自建planet为设备组建虚拟局域网
date: 2025/02/06
tags:
 - Web
 - 物联网
 - 多设备
categories:
 - 实用工具
---

## zerotier

zerotier是一个基于P2P技术的用于搭建**虚拟局域网**的工具。

局域网为某个AP下的不同设备分配不同的IP，设备之间可以通过IP互相访问。例如一间房子里有一个路由器，所有连接到该路由器的设备组成了一个局域网。

但是，经常有访问不在同一局域网设备的需求。例如，你带着一台笔记本电脑去教室上课，但是想要访问你放在宿舍的服务器或者台式电脑。这时，一种方法是通过frp等手段搭建**内网穿透**，这种方法将内网的端口映射并暴露在公网中，从而可以使用远程服务，但是安全性稍差，且要求必须有公网IP。

虚拟局域网则是通过P2P技术，也就是俗称打洞。它不需要公网IP，且每个设备在虚拟局域网中的IP不变，就好像在同一个局域网中一样。缺点是，打洞能否成功经常需要取决于服务商等因素。

## 安装zerotier客户端

客户端安装方式如下。

### Windows

在官网下载页（https://www.zerotier.com/download/）下载msi文件并安装。

安装后，默认配置文件位置：` C:\ProgramData\ZeroTier\One`

### MacOS

在官网下载页（https://www.zerotier.com/download/）下载MacOS PKG Installer并安装。

安装后，默认配置文件位置：`/Library/Application Support/ZeroTier/One`

### Ubuntu

```shell
curl -s https://install.zerotier.com | sudo bash
```

安装后，配置文件目录在：`/var/lib/zerotier-one`

## 加入网络

Windows和MacOS下，使用图形化界面即可。例：

![image-20251110023314046](./assets/image-20251110023314046.png)

Ubuntu（或者说Linux）下，需要使用命令行工具

```shell
zerotier-cli join $YOUR_NET_ID
```

`$YOUR_NET_ID`是你的网络节点ID。

## 配置网络节点

如果你计划使用官方服务，请在官网（https://www.zerotier.com）注册账号和节点，并在Member选项卡中管理你的设备，绑定虚拟IP。绑定好并打洞成功后，可以试着能否Ping通。

```shell
ping $YOUR_VIRTUAL_IP
```

如果能ping通说明打洞成功了。

## 自建planet服务器

由于官方服务需要跨境访问，可能带来不好的体验，因此如果有服务器的话更推荐在服务器上自建一个服务端。一个planet服务器需要有一个UI界面，和一个分发给各设备的planet文件。

### 在服务器上搭建ztncui

主要参考https://key-networks.com/ztncui/#installation。

关键命令如下。

获取deb安装包

```shell
curl -O https://s3-us-west-1.amazonaws.com/key-networks/deb/ztncui/1/x86_64/ztncui_0.8.14_amd64.deb
```

使用apt安装

```shell
sudo apt install ./ztncui_0.8.14_amd64.deb
```

创建`.env`文件

```shell
sudo sh -c "echo ZT_TOKEN=`sudo cat /var/lib/zerotier-one/authtoken.secret` > /opt/key-networks/ztncui/.env"
```

在`.env`文件中添加以下内容

```shell
HTTPS_PORT=3443
NODE_ENV=production
```

更改权限

```shell
sudo chmod 400 /opt/key-networks/ztncui/.env
sudo chown ztncui.ztncui /opt/key-networks/ztncui/.env
```

启动服务，以及检查服务状态

```shell
sudo systemctl restart ztncui
sudo systemctl status ztncui
```

服务启动后，就可以通过服务器的3443端口访问ztncui了。由于没有证书，浏览器可能会警告，这是正常的。

### ztncui的使用

进入ztncui后点击右上角login。首次登录，用户名填`admin`，密码填`password`。

![image-20251110024731078](./assets/image-20251110024731078.png)

登录成功后，建议设置一个强度够高的新密码，因为这个页面是在公网里随时被扫的。创建好新用户后建议把原始的admin账户删除（或者至少改掉默认密码）。

然后在`Networks`一栏，跟随页面提示建立一个新的网络节点，自行分配虚拟网段。配置好后，记下NetworkID，设备加入网络就需要添加这个id。

![image-20251110025108310](./assets/image-20251110025108310.png)

### 制作并分发planet文件

制作planet文件首先需要写好moon配置，获得`moon.json`文件。

初始化moon配置文件

```shell
cd /var/lib/zerotier-one # 进入`zerotier-one`库目录
zerotier-idtool initmoon identity.public >> moon.json # 生成 json文件
```

编辑`moon.json`文件，在`stableEndpoints`下配置自己的公网IP以及端口，端口使用默认的`9993`即可。这样`moon.json`就写好了。

在https://github.com/kaaass/ZeroTierOne/releases下载可执行文件`mkmoonworld-x86_64`，然后执行

```shell
cp /var/lib/zerotier-one/moon.json ./
./mkmoonworld-x86_64 ./moon.json
mv world.bin planet
```

这就制作好planet文件了。

找到各个需要部署的客户端（目录见上），将原有的planet重命名进行备份

```shell
# 在各个客户端的对应目录内
mv planet planet.old
```

然后将制作好的planet放到该目录下，代替原有的planet，并重启服务。

### 重启服务并查找自己的服务器节点

mac重启服务：

```shell
sudo launchctl unload /Library/LaunchDaemons/com.ZeroTier.one.plist
sudo launchctl load /Library/LaunchDaemons/com.ZeroTier.one.plist
```

linux重启服务：

```shell
systemctl restart zerotier-one.service
```

windows重启服务：

去服务页面里面找到对应服务，重启。

重启好以后，测试能否找到服务器

```shell
zerotier-cli listpeers
```

如果能看到自己的服务器ip就说明搭建成功了。

### 设备加入节点

根据服务器ztncui的节点ID，让自己的设备加入对应的网络。初次加入网络需要在后台ztncui中勾选`Authorized`进行许可。

```shell
zerotier-cli join $YOUR_NET_ID #有图形界面的使用图形界面
```

如果设备能在后台显示在线，并且互相能ping通，说明虚拟局域网搭好了。

![image-20251110030705191](./assets/image-20251110030705191.png)

至此，你的所有设备像是被加入了一个局域网，通过固定ip即可相互访问，也可以ssh或者远程桌面等。
