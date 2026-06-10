"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "仪表盘", icon: "📊" },
  { href: "/env", label: "环境变量", icon: "🔧" },
  { href: "/settings", label: "设置", icon: "⚙️" },
];

const scriptItems = [
  { href: "/env/scripts/checkdata", label: "邮件配置", icon: "📧", desc: "CHECKDATA" },
  { href: "/env/scripts/lenovo", label: "联想签到", icon: "💻", desc: "lenovoInfo" },
  { href: "/env/scripts/linkai", label: "LinkAI 签到", icon: "🤖", desc: "linkAuth / linkInfo" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen glass-card p-4 flex flex-col gap-2 fixed left-0 top-0 overflow-y-auto">
      <div className="px-3 py-4">
        <h1 className="text-xl font-bold text-gray-900">青龙面板管理</h1>
        <p className="text-sm text-gray-500">环境变量可视化管理</p>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">脚本配置</p>
        </div>

        {scriptItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div>{item.label}</div>
                <div className="text-xs text-gray-400 truncate">{item.desc}</div>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
