import { GlassContainer } from "@/components/layout/glass-container";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-gray-500">青龙面板环境变量可视化管理</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/env">
          <GlassContainer className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="text-3xl mb-2">🔧</div>
            <h2 className="text-lg font-semibold text-gray-900">环境变量</h2>
            <p className="text-sm text-gray-500">查看和管理所有环境变量</p>
          </GlassContainer>
        </Link>

        <Link href="/env/new">
          <GlassContainer className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="text-3xl mb-2">➕</div>
            <h2 className="text-lg font-semibold text-gray-900">新建配置</h2>
            <p className="text-sm text-gray-500">创建新的每日推送配置</p>
          </GlassContainer>
        </Link>

        <Link href="/settings">
          <GlassContainer className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="text-3xl mb-2">⚙️</div>
            <h2 className="text-lg font-semibold text-gray-900">系统设置</h2>
            <p className="text-sm text-gray-500">配置青龙面板连接</p>
          </GlassContainer>
        </Link>
      </div>
    </div>
  );
}
