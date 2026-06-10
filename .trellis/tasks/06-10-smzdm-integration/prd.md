# brainstorm: 融合smzdm_script并整理青龙脚本

## Goal

将 hex-ci/smzdm_script 仓库的功能融合到当前项目中，并将所有青龙脚本整理到专门的文件夹，使项目结构更清晰。

## What I already know

* 当前项目有4个青龙脚本：`ql-checkWorkingDays.js`, `ql-dailyPush.js`, `ql-lenovo.js`, `ql-linkAi.js`
* 目标融合仓库：https://github.com/hex-ci/smzdm_script
* 网络连接 GitHub 有问题，无法直接获取仓库内容

## Assumptions (temporary)

* smzdm_script 是什么值得买(SMZDM)网站相关的脚本
* 该脚本可能包含签到、领币、任务等功能
* 用户希望保持青龙面板的兼容性

## Open Questions

* smzdm_script 仓库的主要功能是什么？
* 该脚本需要哪些环境变量或配置？
* 整理后的文件夹结构应该如何命名？

## Requirements (evolving)

* [ ] 了解 smzdm_script 的功能和依赖
* [ ] 创建 `scripts/qinglong/` 或类似的专门文件夹
* [ ] 将现有 ql-*.js 移动到新文件夹
* [ ] 融合 smzdm_script 的功能
* [ ] 更新相关文档和配置

## Acceptance Criteria (evolving)

* [ ] 所有青龙脚本位于统一的文件夹中
* [ ] smzdm_script 功能成功融合
* [ ] 脚本在青龙面板中可正常运行
* [ ] README 更新说明新的文件结构

## Definition of Done (team quality bar)

* 脚本功能正常
* 文件结构清晰
* 文档更新完整

## Out of Scope (explicit)

* 修改青龙面板本身
* 重写现有脚本的核心逻辑

## Technical Notes

* 当前项目使用 Next.js + TypeScript
* 青龙脚本是独立的 JS 文件
* 参考：https://github.com/hex-ci/smzdm_script
