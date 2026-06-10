import { EnvForm } from "@/components/env/env-form";

export default async function NewEnvPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">新建每日推送配置</h1>
        <p className="text-gray-500">创建新的 daliyPushConfigs 环境变量</p>
      </div>
      <EnvForm mode="create" />
    </div>
  );
}
