"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "仪表盘", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/env", label: "环境变量", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/settings", label: "设置", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 z-50">
      {/* Sidebar Container */}
      <div className="relative h-full p-4 preserve-3d">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 to-dark-950/90 backdrop-blur-xl border-r border-white/[0.05]" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Section */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              {/* 3D Logo Icon */}
              <div className="relative w-12 h-12 preserve-3d animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-glow-blue transform rotate-y-12" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-gradient">青龙面板</h1>
                <p className="text-xs text-dark-400">环境变量管理</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isHovered = hoveredItem === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 preserve-3d group",
                    isActive
                      ? "text-white"
                      : "text-dark-400 hover:text-white"
                  )}
                  style={{
                    transform: isHovered && !isActive ? "translateZ(8px)" : undefined
                  }}
                >
                  {/* Background */}
                  {(isActive || isHovered) && (
                    <div 
                      className={cn(
                        "absolute inset-0 rounded-xl transition-all duration-300",
                        isActive 
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                          : "bg-white/[0.05] border border-white/[0.08]"
                      )}
                      style={{
                        boxShadow: isActive 
                          ? "0 0 30px rgba(59, 130, 246, 0.2), 0 10px 20px -5px rgba(0, 0, 0, 0.3)"
                          : undefined
                      }}
                    />
                  )}
                  
                  {/* Icon */}
                  <div className={cn(
                    "relative z-10 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-white/[0.05] text-dark-400 group-hover:text-white group-hover:bg-white/[0.1]"
                  )}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  
                  {/* Label */}
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse-glow" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="px-3 pb-6">
            <div className="px-4 py-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">管理员</p>
                  <p className="text-xs text-dark-400">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
