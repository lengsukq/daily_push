# 为每个青龙脚本添加独立配置表单

## Goal

为现有的 4 个青龙脚本（CHECKDATA、lenovoInfo、linkAuth/linkInfo）各添加独立的可视化配置表单页面，替代手动编写 JSON。

## 脚本与环境变量

| 脚本 | 环境变量名 | 字段 |
|------|-----------|------|
| ql-checkWorkingDays.js | CHECKDATA | `{ user, password, emailString }` |
| ql-lenovo.js | lenovoInfo | `{ account, password }` |
| ql-linkAi.js | linkAuth | 纯字符串 token |
| ql-linkAi.js | linkInfo | `{ username, password }` |

## 表单设计

### CHECKDATA（邮件配置）
| 字段 | 类型 | 说明 |
|------|------|------|
| user | input | 发件人邮箱地址 |
| password | input (password) | 邮箱密码或授权码 |
| emailString | textarea | 收件人邮箱（分号分隔） |

### lenovoInfo（联想账号）
| 字段 | 类型 | 说明 |
|------|------|------|
| account | input | 联想账号（手机号） |
| password | input (password) | 联想密码 |

### linkAuth（LinkAI Token）
| 字段 | 类型 | 说明 |
|------|------|------|
| linkAuth | input (password) | Bearer Token |

### linkInfo（LinkAI 账号）
| 字段 | 类型 | 说明 |
|------|------|------|
| username | input | LinkAI 用户名 |
| password | input (password) | LinkAI 密码 |

## 页面结构

```
/env/scripts/checkdata    → CHECKDATA 表单
/env/scripts/lenovo       → lenovoInfo 表单
/env/scripts/linkai       → linkAuth + linkInfo 表单（同一页面两个区域）
```

## 验收标准

- [ ] 侧边栏新增"脚本配置"导航组
- [ ] CHECKDATA 表单页面可编辑/保存
- [ ] lenovoInfo 表单页面可编辑/保存
- [ ] linkAuth + linkInfo 表单页面可编辑/保存
- [ ] 保存后写入青龙面板对应环境变量
