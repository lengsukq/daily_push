import { EnvForm } from "@/components/env/env-form";
import Link from "next/link";

export default async function NewEnvPage() {
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
          <h1 className="text-4xl font-bold text-gradient">新建每日推送配置</h1>
        </div>
        <p className="text-dark-400 text-lg ml-8">创建新的 daliyPushConfigs 环境变量</p>
      </div>

      {/* Decorative Line */}
      <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />

      {/* Form */}
      <EnvForm mode="create" />
    </div>
  );
}
