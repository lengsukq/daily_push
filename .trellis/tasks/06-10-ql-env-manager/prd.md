# brainstorm: QingLong env visual manager

## Goal

将 daily_push 项目的众多脚本整合为一个统一的管理系统，通过 Next.js + TailwindCSS + React + 高可定制化 UI 库 的前端界面，让用户能够可视化地配置项目中所有脚本所需的环境变量，并管理 QingLong（青龙面板）的环境变量。

## What I already know

### 现有项目结构
- 这是一个扁平的 Node.js 脚本项目，运行在 QingLong 面板上
- 包含 5 个 `ql-*.js` 定时任务 + 若干独立脚本
- `index.js` 是核心 WeChat 推送模块，通过 `configs.json` 或 `daliyPushConfigs` 环境变量配置
- `sendNotify.js` 提供了 15+ 种通知渠道

### 所有需要管理的环境变量

**任务级环境变量（每个任务独立的配置）：**
| Env Var | 所属脚本 | 内容 |
|---------|---------|------|
| `daliyPushConfigs` | index.js / ql-dailyPush | 复杂 JSON：天气API key、微信模板、收件人、纪念日日期等 |
| `CHECKDATA` | ql-checkWorkingDays | `{ user, password, emailString }` 邮件配置 |
| `lenovoInfo` | ql-lenovo | `{ account, password }` 联想账号 |
| `linkAuth` | ql-linkAi | 字符串 token |
| `linkInfo` | ql-linkAi | `{ username, password }` LinkAI 账号 |

**通知渠道环境变量（sendNotify.js，共享的）：**
- **Bark** (iOS): BARK_PUSH, BARK_ICON, BARK_SOUND, BARK_GROUP, BARK_LEVEL, BARK_URL
- **Telegram**: TG_BOT_TOKEN, TG_USER_ID, TG_PROXY_HOST, TG_PROXY_PORT, TG_PROXY_AUTH, TG_API_HOST
- **钉钉**: DD_BOT_TOKEN, DD_BOT_SECRET
- **企业微信**: QYWX_ORIGIN, QYWX_KEY, QYWX_AM
- **Server酱**: PUSH_KEY
- **PushPlus**: PUSH_PLUS_TOKEN, PUSH_PLUS_USER
- **PushDeer**: DEER_KEY, DEER_URL
- **飞书**: FSKEY
- **SMTP 邮件**: SMTP_SERVER, SMTP_SSL, SMTP_EMAIL, SMTP_PASSWORD, SMTP_NAME
- **PushMe**: PUSHME_KEY
- **iGot**: IGOT_PUSH_KEY
- **QQ**: QQ_SKEY, QQ_MODE
- **Go-cqhttp**: GOBOT_URL, GOBOT_TOKEN, GOBOT_QQ
- **Goftify**: GOTIFY_URL, GOTIFY_TOKEN, GOTIFY_PRIORITY
- **Synology Chat**: CHAT_URL, CHAT_TOKEN
- **智能微秘书**: AIBOTK_KEY, AIBOTK_TYPE, AIBOTK_NAME
- **Chronocat**: CHRONOCAT_URL, CHRONOCAT_TOKEN, CHRONOCAT_QQ
- **自定义 Webhook**: WEBHOOK_URL, WEBHOOK_BODY, WEBHOOK_HEADERS, WEBHOOK_METHOD, WEBHOOK_CONTENT_TYPE

### 技术栈（用户指定）
- Next.js (App Router)
- TailwindCSS
- React
- 高可定制化 UI 库（待确定）

## Assumptions (temporary)

- 用户期望这是一个独立的 Web 应用，不一定是嵌入到 QingLong 面板中的插件
- "管理青龙的环境变量" 意味着通过界面编辑后，可以通过某种方式同步到 QingLong 面板

## Open Questions

全部已关闭。

## Requirements (evolving)

### 表单设计原则（全局）

- **一种脚本一个表单** — 每个脚本类型有自己独立的表单页面
- **分组分步** — 每个表单内部按功能分组为多个 tab/step，而非一长条到底
- 未来扩展新脚本时，只需新建一个表单页面，遵循相同模式

### 第一期范围（MVP — 核心版）

**覆盖脚本**:
- `index.js` / `ql-dailyPush.js` → `daliyPushConfigs` 环境变量
- 后期按同样模式扩展其他脚本

**`daliyPushConfigs` 表单分组设计**:
| Tab | 字段 |
|-----|------|
| 基本信息 | name, name2, toUser（收件人列表） |
| 天气配置 | location, adm, key（API key）, weatherIndex |
| 纪念日与生日 | fullInLoveDate, birthday, birthday2 |
| 微信模板 | appId, appSecret, templateId |
| 一言配置 | oneType |

**功能**:
- 青龙面板连接配置（API 地址 + Token）
- 查看/创建/编辑/删除 `daliyPushConfigs` 环境变量
- `daliyPushConfigs` 的可视化分组表单编辑（替代手动写 JSON）
- 环境变量列表页面（搜索、筛选、状态管理）

**技术栈**:
- Next.js App Router
- TailwindCSS
- shadcn/ui
- iOS 风格：大圆角、毛玻璃、简白、动画动效

### 后续扩展（Out of Scope for MVP）
- 其他脚本的环境变量表单（CHECKDATA, lenovoInfo, linkInfo 等）
- 所有通知渠道的可视化配置
- 多用户/权限管理

## Acceptance Criteria

- [ ] 用户可配置青龙面板的连接信息（API 地址 + Token）
- [ ] 用户可查看青龙面板中所有环境变量列表
- [ ] 用户可可视化编辑 `daliyPushConfigs`（无需手写 JSON）
- [ ] 用户可创建/删除/启用/禁用 `daliyPushConfigs`
- [ ] UI 风格为 iOS 大圆角毛玻璃简白风格

## Out of Scope (MVP)

- 其他脚本的环境变量表单（CHECKDATA, lenovoInfo, linkInfo 等）
- 通知渠道的可视化配置
- 多用户/权限管理
- 用户登录认证

## Technical Notes

- 全部脚本使用 CommonJS (`require`)，非 ESM
- 配置读取方式：`configs.json` 文件（开发）或 `process.env` 环境变量（QingLong 生产）
- 脚本可同时作为独立 Node 脚本运行或通过 QingLong 调度
- 项目无 TypeScript、无测试框架
