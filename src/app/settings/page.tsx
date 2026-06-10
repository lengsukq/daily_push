import { GlassContainer } from "@/components/layout/glass-container";
import { QlConnectionForm } from "@/components/settings/ql-connection-form";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">设置</h1>
        <p className="text-gray-500">配置青龙面板连接</p>
      </div>

      <GlassContainer>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          青龙面板连接
        </h2>
        <QlConnectionForm />
      </GlassContainer>
    </div>
  );
}
