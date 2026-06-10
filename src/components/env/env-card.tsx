"use client";

import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/layout/glass-container";
import type { EnvItem } from "@/types";

interface EnvCardProps {
  env: EnvItem;
  onDelete?: (id: number) => void;
  onToggleStatus?: (env: EnvItem) => void;
}

export function EnvCard({ env, onDelete, onToggleStatus }: EnvCardProps) {
  const router = useRouter();

  return (
    <GlassContainer className="flex items-center gap-4 cursor-pointer hover:shadow-xl transition-shadow">
      <div
        className="flex-1 min-w-0"
        onClick={() => router.push(`/env/${env.id}`)}
      >
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
        {onToggleStatus && (
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => onToggleStatus(env)}
          >
            {env.status === 1 ? "禁用" : "启用"}
          </button>
        )}
        <button
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
          onClick={() => router.push(`/env/${env.id}`)}
        >
          编辑
        </button>
        {onDelete && (
          <button
            className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-lg"
            onClick={() => env.id && onDelete(env.id)}
          >
            删除
          </button>
        )}
      </div>
    </GlassContainer>
  );
}
