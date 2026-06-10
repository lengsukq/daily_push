import { LenovoForm } from "@/components/env/lenovo-form";

export default function LenovoPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">联想签到配置</h1>
        <p className="text-gray-500">配置 ql-lenovo.js 的联想账号参数</p>
      </div>
      <LenovoForm />
    </div>
  );
}
