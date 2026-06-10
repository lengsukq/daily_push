import { LinkAiForm } from "@/components/env/linkai-form";

export default function LinkAiPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">LinkAI 签到配置</h1>
        <p className="text-gray-500">配置 ql-linkAi.js 的认证参数</p>
      </div>
      <LinkAiForm />
    </div>
  );
}
