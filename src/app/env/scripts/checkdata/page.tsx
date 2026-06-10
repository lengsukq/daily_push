import { CheckDataForm } from "@/components/env/checkdata-form";

export default function CheckDataPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">邮件配置</h1>
        <p className="text-gray-500">配置 ql-checkWorkingDays.js 的邮件通知参数</p>
      </div>
      <CheckDataForm />
    </div>
  );
}
