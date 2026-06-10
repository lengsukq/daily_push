"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassContainer } from "@/components/layout/glass-container";

const checkDataSchema = z.object({
  user: z.string().min(1, "请输入邮箱地址"),
  password: z.string().min(1, "请输入邮箱密码或授权码"),
  emailString: z.string().min(1, "请输入收件人邮箱"),
});

type CheckDataForm = z.infer<typeof checkDataSchema>;

export function CheckDataForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [envId, setEnvId] = useState<number | null>(null);

  const form = useForm<CheckDataForm>({
    resolver: zodResolver(checkDataSchema),
    defaultValues: { user: "", password: "", emailString: "" },
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/qinglong/envs");
        const data = await res.json();
        const envs = data.data || [];
        const found = envs.find(
          (e: { name: string }) => e.name === "CHECKDATA"
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

  const onSubmit = async (data: CheckDataForm) => {
    setIsSubmitting(true);
    try {
      const payload = { name: "CHECKDATA", value: JSON.stringify(data) };
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
            <Label htmlFor="user">发件人邮箱</Label>
            <Input id="user" placeholder="your@email.com" {...form.register("user")} />
            {errors.user && <p className="text-sm text-red-500">{errors.user.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">邮箱密码 / 授权码</Label>
            <Input id="password" type="password" {...form.register("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailString">收件人邮箱（多个用分号分隔）</Label>
            <Textarea id="emailString" rows={3} placeholder="a@test.com;b@test.com" {...form.register("emailString")} />
            {errors.emailString && <p className="text-sm text-red-500">{errors.emailString.message}</p>}
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
