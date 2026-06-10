import { GlassContainer } from "@/components/layout/glass-container";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative">
        <h1 className="text-4xl font-bold text-gradient">仪表盘</h1>
        <p className="text-dark-400 mt-2 text-lg">青龙面板环境变量可视化管理</p>
        
        {/* Decorative Line */}
        <div className="mt-4 h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassContainer glowColor="blue" className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400">活跃变量</p>
              <p className="text-3xl font-bold text-white mt-1">12</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400">+3</span>
            <span className="text-dark-400">较上周</span>
          </div>
        </GlassContainer>

        <GlassContainer glowColor="purple" className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400">今日推送</p>
              <p className="text-3xl font-bold text-white mt-1">8</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400">100%</span>
            <span className="text-dark-400">成功率</span>
          </div>
        </GlassContainer>

        <GlassContainer glowColor="emerald" className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-400">连接状态</p>
              <p className="text-3xl font-bold text-emerald-400 mt-1">正常</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shadow-glow-emerald group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-dark-400">运行中</span>
          </div>
        </GlassContainer>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">快速操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/env">
            <GlassContainer glowColor="blue" className="group cursor-pointer h-full">
              <div className="flex flex-col h-full">
                {/* 3D Icon */}
                <div className="relative w-16 h-16 mb-4 preserve-3d group-hover:animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-glow-blue transform group-hover:rotate-y-12 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">环境变量</h3>
                <p className="text-sm text-dark-400 flex-1">查看和管理所有环境变量</p>
                
                <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span>查看详情</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </GlassContainer>
          </Link>

          <Link href="/env/new">
            <GlassContainer glowColor="purple" className="group cursor-pointer h-full">
              <div className="flex flex-col h-full">
                {/* 3D Icon */}
                <div className="relative w-16 h-16 mb-4 preserve-3d group-hover:animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-glow-purple transform group-hover:rotate-y-12 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">新建配置</h3>
                <p className="text-sm text-dark-400 flex-1">创建新的每日推送配置</p>
                
                <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span>立即创建</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </GlassContainer>
          </Link>

          <Link href="/settings">
            <GlassContainer glowColor="emerald" className="group cursor-pointer h-full">
              <div className="flex flex-col h-full">
                {/* 3D Icon */}
                <div className="relative w-16 h-16 mb-4 preserve-3d group-hover:animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-glow-emerald transform group-hover:rotate-y-12 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">系统设置</h3>
                <p className="text-sm text-dark-400 flex-1">配置青龙面板连接</p>
                
                <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span>前往设置</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </GlassContainer>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">最近活动</h2>
        <GlassContainer>
          <div className="space-y-4">
            {[
              { time: "2分钟前", action: "更新了环境变量", user: "管理员", color: "blue" },
              { time: "1小时前", action: "新建了推送配置", user: "管理员", color: "purple" },
              { time: "3小时前", action: "修改了系统设置", user: "管理员", color: "emerald" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200">
                <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/20 border border-${item.color}-500/30 flex items-center justify-center`}>
                  <svg className="w-5 h-5 text-${item.color}-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{item.action}</p>
                  <p className="text-xs text-dark-400">{item.user}</p>
                </div>
                <span className="text-xs text-dark-500">{item.time}</span>
              </div>
            ))}
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
