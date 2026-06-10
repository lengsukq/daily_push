"use client";

import { Card3d, Card3dHeader, Card3dTitle, Card3dDescription, Card3dContent } from "@/components/ui/card-3d";
import { Button3d } from "@/components/ui/button-3d";

export default function ThreeDDemoPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_50%,#0f172a_100%)] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">3D Elements Demo</h1>
          <p className="text-lg text-slate-300">展示 3D Web UI 设计效果</p>
        </div>

        {/* 卡片展示区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 玻璃材质卡片 */}
          <Card3d variant="glass" depth="raised" hoverEffect="lift">
            <Card3dHeader>
              <Card3dTitle className="text-white">玻璃材质</Card3dTitle>
              <Card3dDescription className="text-slate-300">
                半透明背景 + 模糊效果
              </Card3dDescription>
            </Card3dHeader>
            <Card3dContent>
              <p className="text-slate-200">
                通过 backdrop-blur 和半透明背景创建玻璃质感，适合信息展示区域。
              </p>
            </Card3dContent>
          </Card3d>

          {/* 金属材质卡片 */}
          <Card3d variant="metal" depth="floating" hoverEffect="rotate">
            <Card3dHeader>
              <Card3dTitle className="text-gray-800">金属材质</Card3dTitle>
              <Card3dDescription className="text-gray-600">
                高光渐变 + 柔和阴影
              </Card3dDescription>
            </Card3dHeader>
            <Card3dContent>
              <p className="text-gray-700">
                使用渐变模拟金属光泽，适合图标和按钮等操作元素。
              </p>
            </Card3dContent>
          </Card3d>

          {/* 霓虹材质卡片 */}
          <Card3d variant="neon" depth="elevated" hoverEffect="glow">
            <Card3dHeader>
              <Card3dTitle className="text-white">霓虹材质</Card3dTitle>
              <Card3dDescription className="text-cyan-200">
                发光边缘 + 彩色渐变
              </Card3dDescription>
            </Card3dHeader>
            <Card3dContent>
              <p className="text-cyan-100">
                通过发光阴影和渐变创建霓虹效果，适合 CTA 和重点元素。
              </p>
            </Card3dContent>
          </Card3d>

          {/* 深色材质卡片 */}
          <Card3d variant="dark" depth="raised" hoverEffect="pop">
            <Card3dHeader>
              <Card3dTitle className="text-white">深色材质</Card3dTitle>
              <Card3dDescription className="text-slate-400">
                深色背景 + 细微边框
              </Card3dDescription>
            </Card3dHeader>
            <Card3dContent>
              <p className="text-slate-300">
                深色背景配合细微边框，适合数据展示和仪表盘组件。
              </p>
            </Card3dContent>
          </Card3d>

          {/* 悬浮效果卡片 */}
          <Card3d variant="glass" depth="floating" hoverEffect="lift">
            <Card3dHeader>
              <Card3dTitle className="text-white">悬浮效果</Card3dTitle>
              <Card3dDescription className="text-slate-300">
                悬停时向上浮动
              </Card3dDescription>
            </Card3dHeader>
            <Card3dContent>
              <p className="text-slate-200">
                鼠标悬停时卡片向上移动，阴影随之变化，营造悬浮感。
              </p>
            </Card3dContent>
          </Card3d>

          {/* 旋转效果卡片 */}
          <Card3d variant="dark" depth="elevated" hoverEffect="rotate">
            <Card3dHeader>
              <Card3dTitle className="text-white">旋转效果</Card3dTitle>
              <Card3dDescription className="text-slate-400">
                悬停时轻微旋转
              </Card3dDescription>
            </Card3dHeader>
            <Card3dContent>
              <p className="text-slate-300">
                鼠标悬停时卡片轻微旋转，模拟从不同角度观察的效果。
              </p>
            </Card3dContent>
          </Card3d>
        </div>

        {/* 按钮展示区 */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white text-center">按钮变体</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button3d variant="glass" size="default" depth="raised" hoverEffect="lift">
              玻璃按钮
            </Button3d>
            <Button3d variant="metal" size="default" depth="raised" hoverEffect="press">
              金属按钮
            </Button3d>
            <Button3d variant="neon" size="default" depth="floating" hoverEffect="glow">
              霓虹按钮
            </Button3d>
            <Button3d variant="dark" size="default" depth="raised" hoverEffect="pop">
              深色按钮
            </Button3d>
            <Button3d variant="ghost" size="default" depth="flat" hoverEffect="none">
              幽灵按钮
            </Button3d>
            <Button3d variant="outline" size="default" depth="flat" hoverEffect="none">
              轮廓按钮
            </Button3d>
          </div>
        </div>

        {/* 深度层次展示 */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white text-center">深度层次</h2>
          <div className="flex justify-center items-end gap-8">
            <Card3d variant="glass" depth="flat" className="w-32 h-32">
              <Card3dContent className="flex items-center justify-center h-full">
                <span className="text-white font-medium">Flat</span>
              </Card3dContent>
            </Card3d>
            <Card3d variant="glass" depth="raised" className="w-32 h-32">
              <Card3dContent className="flex items-center justify-center h-full">
                <span className="text-white font-medium">Raised</span>
              </Card3dContent>
            </Card3d>
            <Card3d variant="glass" depth="floating" className="w-32 h-32">
              <Card3dContent className="flex items-center justify-center h-full">
                <span className="text-white font-medium">Floating</span>
              </Card3dContent>
            </Card3d>
            <Card3d variant="glass" depth="elevated" className="w-32 h-32">
              <Card3dContent className="flex items-center justify-center h-full">
                <span className="text-white font-medium">Elevated</span>
              </Card3dContent>
            </Card3d>
          </div>
        </div>

        {/* 交互提示 */}
        <div className="text-center text-slate-400 text-sm">
          尝试将鼠标悬停在卡片和按钮上，观察 3D 效果
        </div>
      </div>
    </div>
  );
}
