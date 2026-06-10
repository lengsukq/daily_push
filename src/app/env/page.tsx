import { GlassContainer } from "@/components/layout/glass-container";
import { EnvList } from "@/components/env/env-list";
import Link from "next/link";

async function getEnvs() {
  try {
    const res = await fetch("http://localhost:3000/api/qinglong/envs", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function EnvListPage() {
  const envs = await getEnvs();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">环境变量</h1>
          <p className="text-dark-400 mt-2 text-lg">管理青龙面板的所有环境变量</p>
        </div>
        
        <Link href="/env/new">
          <button className="btn-3d light-sweep flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            新建配置
          </button>
        </Link>
      </div>

      {/* Decorative Line */}
      <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />

      {/* Content */}
      <GlassContainer>
        {envs.length > 0 ? (
          <EnvList envs={envs} />
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 flex items-center justify-center preserve-3d animate-float">
              <svg className="w-12 h-12 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-dark-300 text-xl font-medium">暂无环境变量</p>
            <p className="text-dark-500 mt-2">请先在设置页面配置青龙面板连接</p>
            <Link href="/settings">
              <button className="btn-3d mt-6">
                前往设置
              </button>
            </Link>
          </div>
        )}
      </GlassContainer>
    </div>
  );
}
