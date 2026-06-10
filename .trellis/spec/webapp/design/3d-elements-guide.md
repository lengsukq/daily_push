# 3D Elements Design Guide

> 专精于 3D Web 界面的 UI 设计规范，适用于科技感、创新力和高价值感的场景。

---

## 角色设定

你是一名专精于 3D Web 界面的资深 UI 设计师，长期为科技品牌、数字产品和创意工作室打造带有「空间感」和「实体感」的网页体验。你的目标不是模拟真实 3D 游戏，而是用 CSS 3D、透视、分层阴影和光晕，营造一种「屏幕里有实体装置」的错觉。

---

## 场景定位

3D Elements 风格适用于需要突出科技感、创新力和高价值感的场景：
- SaaS 仪表盘首页
- 3D 产品展示页
- 创意工作室官网
- Web3 / 加密货币仪表盘
- 概念项目展示

**不适用场景**：
- 信息极度密集的后台
- 强调纯效率的界面

---

## 视觉设计理念

3D Elements 的核心是通过「分层 + 透视 + 光影」在二维屏幕上构建一个伪 3D 空间。

### 核心原则

1. **分层 (Layering)**：页面元素按深度分层，形成前景、中景、背景
2. **透视 (Perspective)**：使用 CSS perspective 属性创建空间感
3. **光影 (Light & Shadow)**：通过渐变、发光边缘和投影营造实体感

### 元素特征

页面中的模块（卡片、按钮、图标、图表）不再只是扁平方块，而是像浮在舞台上的小方盒：
- 有厚度
- 有投影
- 有旋转角度

---

## 材质与质感

### 常用材质

| 材质 | 实现方式 | 适用场景 |
|------|----------|----------|
| 玻璃 (Glassmorphism) | 半透明背景、blur、内外阴影、细边框 | 卡片、模态框、侧边栏 |
| 金属 | 高光渐变、大范围柔和阴影 | 图标、按钮、装饰元素 |
| 亚克力 | 半透明 + 渐变 + 细微纹理 | 仪表盘组件 |
| 霓虹塑料 | 发光边缘、彩色渐变 | CTA 按钮、重点元素 |

### 材质实现示例

```tsx
// 玻璃材质
<div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/10 rounded-2xl">
  {children}
</div>

// 金属质感
<div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 shadow-2xl shadow-black/20 rounded-xl">
  {children}
</div>

// 霓虹发光
<div className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] rounded-xl">
  {children}
</div>
```

---

## 交互体验

### 交互原则

交互反馈强调「深度」和「视角变化」。

### 悬停效果

```tsx
// 卡片悬停 - 向前弹出 + 阴影变化
<div className="transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:rotateX-2">
  {children}
</div>

// 按钮悬停 - 光带滑过
<button className="relative overflow-hidden group">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
  <span className="relative z-10">Button</span>
</button>
```

### 3D 模型旋转

```tsx
// 持续旋转的立方体
<div className="animate-[spin_10s_linear_infinite] hover:[animation-play-state:paused]">
  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-xl">
    {children}
  </div>
</div>
```

### 动效节奏

- **时长**：0.3–0.6 秒
- **缓动**：ease-out 或 cubic-bezier(0.4, 0, 0.2, 1)
- **原则**：既有重量感，又不会太拖沓

---

## 整体氛围

### 氛围描述

3D Elements 风格营造的是一种「未来实验室 / 创意工作台」的氛围：
- 背景像昏暗的工作室或数据机房
- 前景是一排排悬浮的设备、卡片和模块
- 影视级的光影与微妙的透视

### 色彩方案

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      // 主色调 - 冷色渐变
      '3d-bg': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      '3d-surface': 'rgba(30, 41, 59, 0.8)',
      '3d-border': 'rgba(148, 163, 184, 0.2)',
      
      // 强调色 - 冷色系
      '3d-cyan': '#06b6d4',
      '3d-blue': '#3b82f6',
      '3d-purple': '#8b5cf6',
      
      // 暖色点缀
      '3d-accent': '#f59e0b',
    },
  },
}
```

### 背景模式

```tsx
// 网格背景
<div className="bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:50px_50px]">
  {children}
</div>

// 星空背景
<div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900">
  {children}
</div>
```

---

## 项目集成指南

### 与现有 iOS 设计系统的融合

本项目已采用 iOS-inspired 设计（大圆角、玻璃态、白色主题）。3D Elements 可作为增强层叠加：

| iOS 元素 | 3D 增强方式 |
|----------|-------------|
| 玻璃卡片 | 添加 perspective 和 hover rotateX/Y |
| 圆角按钮 | 添加发光边缘和悬浮阴影 |
| 平面图标 | 添加 3D 旋转和金属质感 |
| 浅色背景 | 替换为深色渐变 + 网格 |

### 实现优先级

1. **高优先级**：卡片和按钮的 3D 悬停效果
2. **中优先级**：深色主题切换
3. **低优先级**：3D 模型展示和复杂动画

### 性能优化

- 使用 `will-change: transform` 优化动画性能
- 避免过度使用 `backdrop-blur`（GPU 开销大）
- 使用 CSS 变量管理主题色，便于切换
- 复杂 3D 效果考虑使用 `transform3d` 而非 `transform`

---

## 常用 Tailwind 工具类

### 3D 变换

```tsx
// 透视
perspective-1000 // perspective: 1000px

// 旋转
rotateX-2 // rotateX(2deg)
rotateY-2 // rotateY(2deg)
-rotateX-2 // rotateX(-2deg)

// 平移
translateZ-10 // translateZ(10px)
-translate-y-2 // translateY(-8px)
```

### 发光效果

```tsx
// 阴影发光
shadow-[0_0_15px_rgba(6,182,212,0.5)] // 青色发光
shadow-[0_0_30px_rgba(139,92,246,0.4)] // 紫色发光

// 边框发光
ring-2 ring-cyan-500/50
```

### 渐变

```tsx
// 金属渐变
bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300

// 霓虹渐变
bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
```

---

## 禁止模式

- ❌ 不要过度使用 3D 效果导致性能问题
- ❌ 不要让动画持续时间超过 1 秒
- ❌ 不要使用复杂的 WebGL（除非必要）
- ❌ 不要让 3D 效果影响可访问性
- ❌ 不要在信息密集型界面使用此风格

---

## 最佳实践清单

- [ ] 深色背景 + 浅色前景对比度 ≥ 4.5:1
- [ ] 所有 3D 效果有 fallback（禁用动画时）
- [ ] 动画时长控制在 0.3-0.6 秒
- [ ] 悬停效果有明确的视觉反馈
- [ ] 材质质感一致（不要混用过多材质）
- [ ] 性能测试通过（60fps）
- [ ] 移动端适配（触摸设备无悬停效果）

---

## 参考资源

- [CSS 3D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms)
- [Glassmorphism Generator](https://hype4.academy/tools/glassmorphism-generator)
- [CSS Gradient Generator](https://cssgradient.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**最后更新**: 2025-01
