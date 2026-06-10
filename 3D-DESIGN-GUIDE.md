# 3D Elements 设计规范

本项目已集成 3D Elements 设计规范，为科技感、创新力和高价值感的场景提供增强的视觉体验。

## 📁 文件结构

```
.trellis/spec/
├── webapp/
│   ├── design/
│   │   └── 3d-elements-guide.md    # 3D 设计规范主文档
│   └── index.md                     # 已更新，包含 3D 指南引用
├── guides/
│   ├── 3d-elements-thinking-guide.md # 3D 设计思考指南
│   └── index.md                      # 已更新，包含 3D 思考指南引用
src/components/ui/
├── card-3d.tsx                      # 3D 卡片组件
├── button-3d.tsx                    # 3D 按钮组件
src/app/
└── 3d-demo/
    └── page.tsx                     # 3D 效果演示页面
tailwind.config.ts                   # 已更新，添加 3D 相关配置
```

## 🎨 设计规范

### 核心原则

1. **分层 (Layering)**：页面元素按深度分层，形成前景、中景、背景
2. **透视 (Perspective)**：使用 CSS perspective 属性创建空间感
3. **光影 (Light & Shadow)**：通过渐变、发光边缘和投影营造实体感

### 材质类型

| 材质 | 特点 | 适用场景 |
|------|------|----------|
| 玻璃 (Glass) | 半透明、模糊、细边框 | 卡片、模态框 |
| 金属 (Metal) | 高光渐变、柔和阴影 | 图标、按钮 |
| 霓虹 (Neon) | 发光边缘、彩色渐变 | CTA、重点元素 |
| 深色 (Dark) | 深色背景、细微边框 | 数据展示 |

### 深度层次

- **Flat**: 无深度 (translateZ: 0)
- **Raised**: 轻微提升 (translateZ: 1)
- **Floating**: 悬浮效果 (translateZ: 2)
- **Elevated**: 高度提升 (translateZ: 4)

### 悬停效果

- **Lift**: 向上浮动 + 阴影增强
- **Rotate**: 轻微旋转视角变化
- **Glow**: 发光边缘增强
- **Pop**: 放大 + 浮动

## 🚀 使用方法

### 安装依赖

无需额外依赖，已使用 TailwindCSS 原生支持。

### 导入组件

```tsx
// 3D 卡片
import { Card3d, Card3dHeader, Card3dTitle, Card3dDescription, Card3dContent } from "@/components/ui/card-3d";

// 3D 按钮
import { Button3d } from "@/components/ui/button-3d";
```

### 使用示例

```tsx
// 玻璃材质卡片
<Card3d variant="glass" depth="raised" hoverEffect="lift">
  <Card3dHeader>
    <Card3dTitle className="text-white">标题</Card3dTitle>
    <Card3dDescription className="text-slate-300">描述</Card3dDescription>
  </Card3dHeader>
  <Card3dContent>
    <p className="text-slate-200">内容</p>
  </Card3dContent>
</Card3d>

// 霓虹按钮
<Button3d variant="neon" size="default" depth="floating" hoverEffect="glow">
  点击我
</Button3d>
```

## 🎯 演示页面

访问 `/3d-demo` 查看所有 3D 效果演示：
- 不同材质卡片展示
- 按钮变体展示
- 深度层次对比
- 交互效果演示

## 📐 TailwindCSS 配置

已添加的配置：

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      "3d": {
        cyan: "#06b6d4",
        blue: "#3b82f6",
        purple: "#8b5cf6",
        accent: "#f59e0b",
      },
    },
    boxShadow: {
      "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.4)",
      "glow-amber": "0 0 30px rgba(245, 158, 11, 0.4)",
      "3d-light": "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      "3d-medium": "0 8px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      "3d-heavy": "0 15px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    },
  },
}
```

## 🎨 设计决策指南

在实现 3D 效果前，请参考：
- `.trellis/spec/guides/3d-elements-thinking-guide.md` - 设计思考指南
- `.trellis/spec/webapp/design/3d-elements-guide.md` - 完整设计规范

## ⚡ 性能优化

1. 使用 `will-change: transform` 优化动画性能
2. 避免过度使用 `backdrop-blur`（GPU 开销大）
3. 动画时长控制在 0.3-0.6 秒
4. 复杂 3D 效果使用 `transform3d` 而非 `transform`

## 🔍 测试清单

- [ ] 在不同屏幕尺寸下 3D 效果是否正常
- [ ] 动画是否流畅（60fps）
- [ ] 颜色对比度是否满足 WCAG 标准
- [ ] 是否在低端设备上测试过
- [ ] 是否提供禁用动画的 fallback

---

**最后更新**: 2025-01
