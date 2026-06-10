"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "仪表盘", icon: "📊" },
  { href: "/env", label: "环境变量", icon: "🔧" },
  { href: "/settings", label: "设置", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen glass-card p-4 flex flex-col gap-2 fixed left-0 top-0">
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
      </nav>
    </aside>
  );
}
