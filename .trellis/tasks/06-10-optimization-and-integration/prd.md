# 项目优化与青龙生态对接

## Goal

优化现有项目体验，并对接更多青龙生态脚本，扩展环境变量管理能力。

## Part 1: 现有项目优化

### 1.1 Dashboard 数据真实化

**现状：** `src/app/page.tsx` 统计卡片数据硬编码

**优化方案：**
- 对接青龙 API 获取真实环境变量数量
- 对接青龙任务列表获取定时任务状态
- 显示最近推送成功/失败次数（可从日志或通知记录获取）

| 卡片 | 数据来源 |
|------|----------|
| 活跃变量数 | `GET /open/envs` → count enabled |
| 定时任务 | `GET /open/crons` → count active |
| 今日推送 | 需要额外记录或从脚本日志解析 |
| 成功率 | 需要额外记录或从脚本日志解析 |

### 1.2 环境变量批量导入/导出

**现状：** 只能逐个创建环境变量

**优化方案：**
- 导出功能：将当前所有环境变量导出为 JSON 文件
- 导入功能：支持 JSON 文件批量导入，可选覆盖策略
- 预设模板：内置常用脚本的环境变量模板

**页面：** `/env` 页面添加导入/导出按钮

### 1.3 Docker 部署支持

**现状：** `docker/` 目录为空，项目支持 standalone 输出

**优化方案：**
- 编写 `Dockerfile`
- 编写 `docker-compose.yml`
- 支持环境变量配置数据库和青龙连接

---

## Part 2: 青龙生态脚本对接

### 2.1 推荐对接的脚本

| 项目 | Star | 用途 | 环境变量 | 拉库命令 |
|------|------|------|----------|----------|
| [Sitoi/dailycheckin](https://github.com/Sitoi/dailycheckin) | 8.6k | 多平台签到 | `ACCOUNT_FILE` | `ql repo https://github.com/Sitoi/dailycheckin.git "dailycheckin" "" "^dailycheckin"` |
| [hex-ci/smzdm_script](https://github.com/hex-ci/smzdm_script) | 1.6k | 什么值得买 | `SMZDM_COOKIE` | `ql repo https://github.com/hex-ci/smzdm_script.git "smzdm_" "" "env.js\|bot.js\|sendNotify.js\|library_" "main"` |

### 2.2 dailycheckin 对接

**支持平台：** 爱奇艺、全民K歌、有道云笔记、百度贴吧、Bilibili、V2EX、AcFun、什么值得买、阿里云盘、i茅台申购、小米运动等

**环境变量模板：**
```json
{
  "ACCOUNT_FILE": "./account.json"
}
```

**account.json 格式：**
```json
{
  "iqiyi": [{ "cookie": "IQIYI_COOKIE值" }],
  "bilibili": [{ "cookie": "BILIBILI_COOKIE值" }],
  "aliyundrive": [{ "cookie": "ALIYUNDRIVE_COOKIE值", "refresh_token": "xxx" }]
}
```

**配置表单页面：** `/env/scripts/dailycheckin`

**表单字段：**
| 字段 | 类型 | 说明 |
|------|------|------|
| platforms | multi-select | 选择要签到的平台 |
| iqiyi_cookie | textarea | 爱奇艺 Cookie |
| bilibili_cookie | textarea | B站 Cookie |
| aliyundrive_cookie | textarea | 阿里云盘 Cookie |
| aliyundrive_refresh_token | textarea | 阿里云盘 Refresh Token |
| ... | ... | 其他平台 |

### 2.3 smzdm_script 对接

**环境变量模板：**
```json
{
  "SMZDM_COOKIE": "什么值得买Cookie",
  "SMZDM_SK": "签名密钥（可选）",
  "SMZDM_COMMENT": "评论文案（可选）",
  "SMZDM_USER_AGENT_APP": "APP UA（可选）"
}
```

**配置表单页面：** `/env/scripts/smzdm`

**表单字段：**
| 字段 | 类型 | 说明 |
|------|------|------|
| SMZDM_COOKIE | textarea | 什么值得买 Cookie（必填） |
| SMZDM_SK | input | 签名密钥（可选） |
| SMZDM_COMMENT | textarea | 评论文案（可选） |
| SMZDM_USER_AGENT_APP | input | APP User-Agent（可选） |

---

## 页面结构变更

```
/env                              # 环境变量列表（添加导入/导出按钮）
/env/new                          # 新建环境变量
/env/[id]                         # 编辑环境变量
/env/scripts/dailycheckin         # dailycheckin 配置表单
/env/scripts/smzdm                # 什么值得买配置表单
/env/scripts/linkai               # LinkAI 配置表单
/env/scripts/lenovo               # 联想配置表单
/env/scripts/checkdata            # 邮件配置表单
```

## 侧边栏导航变更

```
📊 仪表盘
📦 环境变量
   ├── 列表
   ├── 新建
   └── 导入/导出
⚙️ 脚本配置
   ├── 每日推送
   ├── dailycheckin（多平台签到）
   ├── 什么值得买
   ├── LinkAI
   ├── 联想签到
   └── 邮件配置
```

## 验收标准

### Part 1
- [ ] Dashboard 数据从青龙 API 真实获取
- [ ] 环境变量列表页有导入/导出按钮
- [ ] 导出功能可下载 JSON 文件
- [ ] 导入功能可选择 JSON 文件批量导入
- [ ] Dockerfile 和 docker-compose.yml 可用

### Part 2
- [ ] dailycheckin 配置表单页面可用
- [ ] smzdm 配置表单页面可用
- [ ] 保存后写入青龙面板对应环境变量
- [ ] 侧边栏导航更新
