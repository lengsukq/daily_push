"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GlassContainer } from "@/components/layout/glass-container";

const linkAiSchema = z.object({
  linkAuth: z.string().optional(),
  linkInfo: z.object({
    username: z.string().optional(),
    password: z.string().optional(),
  }).optional(),
});

type LinkAiForm = z.infer<typeof linkAiSchema>;

export function LinkAiForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkAuthId, setLinkAuthId] = useState<number | null>(null);
  const [linkInfoId, setLinkInfoId] = useState<number | null>(null);

  const form = useForm<LinkAiForm>({
    resolver: zodResolver(linkAiSchema),
    defaultValues: {
      linkAuth: "",
      linkInfo: { username: "", password: "" },
    },
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/qinglong/envs");
        const data = await res.json();
        const envs = data.data || [];

        const authEnv = envs.find((e: { name: string }) => e.name === "linkAuth");
        if (authEnv) {
          setLinkAuthId(authEnv.id);
          form.setValue("linkAuth", authEnv.value);
        }

        const infoEnv = envs.find((e: { name: string }) => e.name === "linkInfo");
        if (infoEnv) {
          setLinkInfoId(infoEnv.id);
          const parsed = JSON.parse(infoEnv.value);
          form.setValue("linkInfo", parsed);
        }
      } catch (error) {
        console.error("加载失败:", error);
      }
    }
    load();
  }, [form]);

  const onSubmit = async (data: LinkAiForm) => {
    setIsSubmitting(true);
    try {
      if (data.linkAuth) {
        const payload = { name: "linkAuth", value: data.linkAuth };
        if (linkAuthId) {
          await fetch(`/api/qinglong/envs/${linkAuthId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          await fetch("/api/qinglong/envs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      }

      if (data.linkInfo?.username && data.linkInfo?.password) {
        const payload = { name: "linkInfo", value: JSON.stringify(data.linkInfo) };
        if (linkInfoId) {
          await fetch(`/api/qinglong/envs/${linkInfoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          await fetch("/api/qinglong/envs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      }

      router.refresh();
    } catch (error) {
      console.error("保存失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <GlassContainer>
        <h3 className="text-sm font-medium text-gray-500 mb-4">LinkAI Token（直接认证）</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkAuth">Bearer Token</Label>
            <Input id="linkAuth" type="password" placeholder="如有 Token 直接填写，可跳过下方账号登录" {...form.register("linkAuth")} />
          </div>
        </div>
      </GlassContainer>

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-gray-400">或</span>
        <Separator className="flex-1" />
      </div>

      <GlassContainer>
        <h3 className="text-sm font-medium text-gray-500 mb-4">LinkAI 账号登录</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkInfo.username">用户名</Label>
            <Input id="linkInfo.username" placeholder="LinkAI 用户名" {...form.register("linkInfo.username")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkInfo.password">密码</Label>
            <Input id="linkInfo.password" type="password" {...form.register("linkInfo.password")} />
          </div>
        </div>
      </GlassContainer>

      <div className="flex gap-2 justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
      </div>
    </form>
  );
}
