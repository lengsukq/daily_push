import { GlassContainer } from "@/components/layout/glass-container";
import { EnvList } from "@/components/env/env-list";

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
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">环境变量</h1>
          <p className="text-gray-500">管理青龙面板的所有环境变量</p>
        </div>
      </div>

      <GlassContainer>
        {envs.length > 0 ? (
          <EnvList envs={envs} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无环境变量</p>
            <p className="text-sm text-gray-400 mt-1">
              请先在设置页面配置青龙面板连接
            </p>
          </div>
        )}
      </GlassContainer>
    </div>
  );
}
