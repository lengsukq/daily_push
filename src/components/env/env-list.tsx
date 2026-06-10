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
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="搜索环境变量..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        {selectedIds.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => handleDelete(selectedIds)}
          >
            删除选中 ({selectedIds.length})
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {filteredEnvs.map((env) => (
          <GlassContainer
            key={env.id}
            className="flex items-center gap-4 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(env.id!)}
              onChange={() => toggleSelect(env.id!)}
              className="w-4 h-4"
            />
            <div className="flex-1 min-w-0" onClick={() => router.push(`/env/${env.id}`)}>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 truncate">{env.name}</h3>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    env.status === 1
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {env.status === 1 ? "启用" : "禁用"}
                </span>
              </div>
              {env.remarks && (
                <p className="text-sm text-gray-500 truncate">{env.remarks}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleToggleStatus(env)}
              >
                {env.status === 1 ? "禁用" : "启用"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push(`/env/${env.id}`)}
              >
                编辑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500"
                onClick={() => handleDelete([env.id!])}
              >
                删除
              </Button>
            </div>
          </GlassContainer>
        ))}
      </div>
    </div>
  );
}
