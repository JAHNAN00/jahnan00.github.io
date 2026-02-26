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

## ZeroTier 是什么

ZeroTier 是一个虚拟网络工具，可以把分散在不同网络环境中的设备，连接成一个“像在同一局域网里”的私有网络。

例如：你在教室的笔记本，需要访问宿舍里的台式机或家庭服务器。传统做法是内网穿透（如 FRP），而 ZeroTier 更偏向“组网”，让设备之间直接通过虚拟 IP 互联。

## 使用前说明

为了避免概念混淆，先统一几个术语：

1. FRP 这类内网穿透方案，通常需要一台公网可访问的中转服务器（常见是云服务器），不一定要求家里设备本身有公网 IP。

2. 自建方案里常见两部分：  
   - 控制器（controller），负责网络管理和设备授权  
   - 私有根配置（moon/planet 文件），用于特定网络环境下的节点发现与加速  
   这两者不是同一个组件。

3. moon/planet 属于进阶配置，并非所有场景都必须使用；常规场景优先保证控制器和设备授权流程可用。

## 安装 ZeroTier 客户端

下载页：<https://www.zerotier.com/download/>

### Windows

下载 MSI 安装包后安装。  
默认数据目录：`C:\ProgramData\ZeroTier\One`

### macOS

下载 PKG 安装包后安装。  
默认数据目录：`/Library/Application Support/ZeroTier/One`

### Ubuntu / Debian

```shell
curl -s https://install.zerotier.com | sudo bash
```

默认数据目录：`/var/lib/zerotier-one`

## 基础用法：加入网络

Windows 和 macOS 可用图形界面加入网络：

![image-20251110023314046](./assets/image-20251110023314046.png)

Linux 命令行：

```shell
zerotier-cli join $YOUR_NET_ID
```

`$YOUR_NET_ID` 是网络 ID（不是节点 ID）。

如果你使用官方托管控制器（my.zerotier.com），首次加入后需要在控制台的 `Members` 中将设备设为 `Authorized`，并给设备分配虚拟网段 IP（自动或手动都可）。

连通性可用以下方式验证：

```shell
ping $PEER_ZT_IP
```

## 自建控制器：使用 ztncui

如果你希望自己管理网络控制平面，可以在服务器上部署 ztncui（ZeroTier 控制器 UI）。

参考：<https://key-networks.com/ztncui/#installation>

### 1) 安装 ztncui

示例（版本号可能变化）：

```shell
curl -O https://s3-us-west-1.amazonaws.com/key-networks/deb/ztncui/1/x86_64/ztncui_0.8.14_amd64.deb
sudo apt install ./ztncui_0.8.14_amd64.deb
```

创建 `.env`：

```shell
sudo sh -c "echo ZT_TOKEN=`sudo cat /var/lib/zerotier-one/authtoken.secret` > /opt/key-networks/ztncui/.env"
```

追加配置：

```shell
HTTPS_PORT=3443
NODE_ENV=production
```

设置权限：

```shell
sudo chmod 400 /opt/key-networks/ztncui/.env
sudo chown ztncui.ztncui /opt/key-networks/ztncui/.env
```

启动并检查：

```shell
sudo systemctl restart ztncui
sudo systemctl status ztncui
```

浏览器访问 `https://<SERVER_IP>:3443`。若未配置证书，出现 HTTPS 警告属正常现象。

### 2) 初始化控制台

首次登录默认账号通常为：

- 用户名：`admin`
- 密码：`password`

![image-20251110024731078](./assets/image-20251110024731078.png)

建议立即修改默认密码，或新建管理员并停用默认账户。

在 `Networks` 页面创建网络，记下 `Network ID`：

![image-20251110025108310](./assets/image-20251110025108310.png)

## 可选进阶：制作并下发 planet 文件（私有根）

这一步不是所有场景都必须，只有在你明确需要私有根时再做。

先生成 `moon.json`：

```shell
cd /var/lib/zerotier-one
zerotier-idtool initmoon identity.public > moon.json
```

编辑 `moon.json`，在 `stableEndpoints` 中写入公网 IP 和端口（通常为 `9993`）。

然后生成 `planet`（world）文件：

```shell
cp /var/lib/zerotier-one/moon.json ./
./mkmoonworld-x86_64 ./moon.json
mv world.bin planet
```

把 `planet` 分发到客户端数据目录（上文各系统目录），并备份旧文件：

```shell
mv planet planet.old
```

## 重启客户端并验证

### macOS

```shell
sudo launchctl unload /Library/LaunchDaemons/com.ZeroTier.one.plist
sudo launchctl load /Library/LaunchDaemons/com.ZeroTier.one.plist
```

### Linux

```shell
sudo systemctl restart zerotier-one.service
```

### Windows

在“服务”管理器中重启 ZeroTier 服务。

检查是否能发现预期对端/根节点：

```shell
zerotier-cli listpeers
```

最后让设备加入目标网络，并在控制器侧授权：

```shell
zerotier-cli join $YOUR_NET_ID
```

如果设备在后台显示在线，且相互 `ping` 通，则组网成功。

![image-20251110030705191](./assets/image-20251110030705191.png)

至此，你就可以通过 ZeroTier 分配的虚拟 IP 进行 SSH、远程桌面或文件传输。
