"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassContainer } from "@/components/layout/glass-container";

const connectionSchema = z.object({
  url: z.string().url("请输入有效的URL"),
  token: z.string().min(1, "请输入Token"),
});

type ConnectionFormData = z.infer<typeof connectionSchema>;

export function QlConnectionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ConnectionFormData>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      url: "",
      token: "",
    },
  });

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/qinglong/config");
        const data = await res.json();
        if (data.data) {
          form.reset({ url: data.data.url, token: data.data.token });
        }
      } catch (error) {
        console.error("加载配置失败:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, [form]);

  const onSubmit = async (data: ConnectionFormData) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/qinglong/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.refresh();
    } catch (error) {
      console.error("保存失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { errors } = form.formState;

  if (isLoading) {
    return (
      <GlassContainer>
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">加载中...</p>
        </div>
      </GlassContainer>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <GlassContainer>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">青龙面板地址</Label>
            <Input
              id="url"
              placeholder="http://192.168.1.100:5700"
              {...form.register("url")}
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="token">Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="请输入青龙面板的 OpenAPI Token"
              {...form.register("token")}
            />
            {errors.token && (
              <p className="text-sm text-red-500">{errors.token.message}</p>
            )}
          </div>
        </div>
      </GlassContainer>

      <div className="flex gap-2 justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存配置"}
        </Button>
      </div>
    </form>
  );
}
