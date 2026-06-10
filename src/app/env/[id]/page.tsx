import { EnvForm } from "@/components/env/env-form";
import Link from "next/link";

async function getEnv(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/qinglong/envs/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function EditEnvPage({
  params,
}: {
  params: { id: string };
}) {
  const env = await getEnv(params.id);

  if (!env) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 flex items-center justify-center">
          <svg className="w-12 h-12 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-dark-300 text-xl font-medium">环境变量不存在</p>
        <Link href="/env">
          <button className="btn-3d mt-6">
            返回列表
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Link href="/env" className="text-dark-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-4xl font-bold text-gradient">编辑环境变量</h1>
        </div>
        <p className="text-dark-400 text-lg ml-8">修改 {env.name}</p>
      </div>

      {/* Decorative Line */}
      <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />

      {/* Form */}
      <EnvForm env={env} mode="edit" />
    </div>
  );
}
