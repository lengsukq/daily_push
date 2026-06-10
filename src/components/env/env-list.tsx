"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassContainer } from "@/components/layout/glass-container";
import type { EnvItem } from "@/types";

interface EnvListProps {
  envs: EnvItem[];
}

export function EnvList({ envs }: EnvListProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredEnvs = envs.filter(
    (env) =>
      env.name.toLowerCase().includes(search.toLowerCase()) ||
      env.remarks?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (ids: number[]) => {
    if (!confirm("确定要删除选中的环境变量吗？")) return;
    try {
      await fetch("/api/qinglong/envs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      router.refresh();
    } catch (error) {
      console.error("删除失败:", error);
    }
  };

  const handleToggleStatus = async (env: EnvItem) => {
    if (!env.id) return;
    try {
      const newStatus = env.status === 1 ? 0 : 1;
      await fetch(`/api/qinglong/envs/${env.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch (error) {
      console.error("更新状态失败:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            placeholder="搜索环境变量..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {selectedIds.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => handleDelete(selectedIds)}
            className="gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            删除选中 ({selectedIds.length})
          </Button>
        )}
      </div>

      {/* Env List */}
      <div className="space-y-3">
        {filteredEnvs.map((env, index) => (
          <GlassContainer
            key={env.id}
            glowColor={index % 3 === 0 ? "blue" : index % 3 === 1 ? "purple" : "emerald"}
            className="group"
          >
            <div className="flex items-center gap-4">
              {/* Checkbox */}
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(env.id!)}
                  onChange={() => toggleSelect(env.id!)}
                  className="w-5 h-5 rounded-lg border-2 border-white/20 bg-white/5 checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 cursor-pointer appearance-none"
                />
                {selectedIds.includes(env.id!) && (
                  <svg className="absolute inset-0 w-5 h-5 text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div 
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => router.push(`/env/${env.id}`)}
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-white truncate group-hover:text-blue-400 transition-colors duration-200">
                    {env.name}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      env.status === 1
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-dark-700 text-dark-400 border border-white/10"
                    }`}
                  >
                    {env.status === 1 ? "启用" : "禁用"}
                  </span>
                </div>
                {env.remarks && (
                  <p className="text-sm text-dark-400 truncate mt-1">{env.remarks}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleToggleStatus(env)}
                  className="h-8 px-3"
                >
                  {env.status === 1 ? "禁用" : "启用"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push(`/env/${env.id}`)}
                  className="h-8 px-3"
                >
                  编辑
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={() => handleDelete([env.id!])}
                >
                  删除
                </Button>
              </div>
            </div>
          </GlassContainer>
        ))}
      </div>

      {/* Empty State */}
      {filteredEnvs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-dark-400 text-lg">暂无环境变量</p>
          <p className="text-dark-500 text-sm mt-1">请先在设置页面配置青龙面板连接</p>
        </div>
      )}
    </div>
  );
}
