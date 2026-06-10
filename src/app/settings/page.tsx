import { GlassContainer } from "@/components/layout/glass-container";
import { QlConnectionForm } from "@/components/settings/ql-connection-form";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient">系统设置</h1>
        <p className="text-dark-400 mt-2 text-lg">配置青龙面板连接</p>
      </div>

      {/* Decorative Line */}
      <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />

      {/* Connection Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <GlassContainer glowColor="blue">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">青龙面板连接</h2>
                <p className="text-sm text-dark-400">配置面板地址和认证信息</p>
              </div>
            </div>
            <QlConnectionForm />
          </GlassContainer>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <GlassContainer glowColor="purple">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">配置说明</h3>
            </div>
            <div className="space-y-3 text-sm text-dark-300">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">1.</span>
                <p>登录青龙面板，进入系统设置</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">2.</span>
                <p>在「应用设置」中创建新的应用</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">3.</span>
                <p>复制 Client ID 和 Client Secret</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">4.</span>
                <p>填写面板地址和认证信息</p>
              </div>
            </div>
          </GlassContainer>

          <GlassContainer glowColor="emerald">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">安全提示</h3>
            </div>
            <div className="text-sm text-dark-300">
              <p>您的认证信息将安全存储在本地数据库中，不会上传到任何第三方服务。</p>
            </div>
          </GlassContainer>
        </div>
      </div>
    </div>
  );
}
