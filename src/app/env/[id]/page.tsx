import { EnvForm } from "@/components/env/env-form";

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
      <div className="text-center py-12">
        <p className="text-gray-500">环境变量不存在</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">编辑环境变量</h1>
        <p className="text-gray-500">修改 {env.name}</p>
      </div>
      <EnvForm env={env} mode="edit" />
    </div>
  );
}
