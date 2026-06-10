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

const lenovoSchema = z.object({
  account: z.string().min(1, "请输入联想账号"),
  password: z.string().min(1, "请输入联想密码"),
});

type LenovoForm = z.infer<typeof lenovoSchema>;

export function LenovoForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [envId, setEnvId] = useState<number | null>(null);

  const form = useForm<LenovoForm>({
    resolver: zodResolver(lenovoSchema),
    defaultValues: { account: "", password: "" },
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/qinglong/envs");
        const data = await res.json();
        const envs = data.data || [];
        const found = envs.find(
          (e: { name: string }) => e.name === "lenovoInfo"
        );
        if (found) {
          setEnvId(found.id);
          const parsed = JSON.parse(found.value);
          form.reset(parsed);
        }
      } catch (error) {
        console.error("加载失败:", error);
      }
    }
    load();
  }, [form]);

  const onSubmit = async (data: LenovoForm) => {
    setIsSubmitting(true);
    try {
      const payload = { name: "lenovoInfo", value: JSON.stringify(data) };
      if (envId) {
        await fetch(`/api/qinglong/envs/${envId}`, {
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
      router.refresh();
    } catch (error) {
      console.error("保存失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <GlassContainer>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account">联想账号（手机号）</Label>
            <Input id="account" placeholder="请输入手机号" {...form.register("account")} />
            {errors.account && <p className="text-sm text-red-500">{errors.account.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">联想密码</Label>
            <Input id="password" type="password" {...form.register("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
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
