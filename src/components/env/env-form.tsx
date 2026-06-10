"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassContainer } from "@/components/layout/glass-container";
import type { EnvItem, DailyPushConfig } from "@/types";

const configSchema = z.object({
  fullInLoveDate: z.string().min(1, "请输入纪念日"),
  birthday: z.string().min(1, "请输入生日"),
  birthday2: z.string().optional(),
  location: z.string().min(1, "请输入城市名称"),
  adm: z.string().min(1, "请输入行政区"),
  key: z.string().min(1, "请输入天气API Key"),
  weatherIndex: z.coerce.number().int().min(1).max(10),
  oneType: z.string().default("a"),
  templateId: z.string().min(1, "请输入微信模板ID"),
  name: z.string().min(1, "请输入昵称"),
  name2: z.string().optional(),
  appId: z.string().min(1, "请输入AppID"),
  appSecret: z.string().min(1, "请输入AppSecret"),
  toUser: z.string().min(1, "请输入收件人，多个用逗号分隔"),
});

type ConfigFormData = z.infer<typeof configSchema>;

interface EnvFormProps {
  env?: EnvItem;
  mode: "create" | "edit";
}

export function EnvForm({ env, mode }: EnvFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let defaultValues: Partial<ConfigFormData> = {
    fullInLoveDate: "",
    birthday: "",
    birthday2: "",
    location: "",
    adm: "",
    key: "",
    weatherIndex: 1,
    oneType: "a",
    templateId: "",
    name: "",
    name2: "",
    appId: "",
    appSecret: "",
    toUser: "",
  };

  if (env?.value) {
    try {
      const parsed = JSON.parse(env.value) as DailyPushConfig;
      defaultValues = {
        ...parsed,
        toUser: Array.isArray(parsed.toUser)
          ? parsed.toUser.join(", ")
          : parsed.toUser,
      };
    } catch {
      console.error("解析配置失败");
    }
  }

  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues,
  });

  const onSubmit = async (data: ConfigFormData) => {
    setIsSubmitting(true);
    try {
      const configValue = JSON.stringify({
        ...data,
        toUser: data.toUser.split(",").map((u) => u.trim()),
      });

      const payload = {
        name: "daliyPushConfigs",
        value: configValue,
        remarks: "每日推送配置",
      };

      if (mode === "edit" && env?.id) {
        await fetch(`/api/qinglong/envs/${env.id}`, {
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
      router.push("/env");
    } catch (error) {
      console.error("保存失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="weather">天气配置</TabsTrigger>
          <TabsTrigger value="anniversary">纪念日与生日</TabsTrigger>
          <TabsTrigger value="wechat">微信模板</TabsTrigger>
          <TabsTrigger value="other">一言配置</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <GlassContainer>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">昵称</Label>
                <Input id="name" {...form.register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name2">昵称2（可选）</Label>
                <Input id="name2" {...form.register("name2")} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="toUser">收件人（多个用逗号分隔）</Label>
                <Textarea id="toUser" {...form.register("toUser")} rows={3} />
                {errors.toUser && (
                  <p className="text-sm text-red-500">{errors.toUser.message}</p>
                )}
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <GlassContainer>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">城市</Label>
                <Input id="location" placeholder="例如: beijing" {...form.register("location")} />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="adm">行政区</Label>
                <Input id="adm" placeholder="例如: 朝阳区" {...form.register("adm")} />
                {errors.adm && (
                  <p className="text-sm text-red-500">{errors.adm.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="key">天气API Key</Label>
                <Input id="key" type="password" {...form.register("key")} />
                {errors.key && (
                  <p className="text-sm text-red-500">{errors.key.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weatherIndex">天气指数</Label>
                <Input id="weatherIndex" type="number" {...form.register("weatherIndex")} />
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="anniversary" className="space-y-4">
          <GlassContainer>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullInLoveDate">恋爱纪念日</Label>
                <Input id="fullInLoveDate" type="date" {...form.register("fullInLoveDate")} />
                {errors.fullInLoveDate && (
                  <p className="text-sm text-red-500">{errors.fullInLoveDate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday">生日</Label>
                <Input id="birthday" type="date" {...form.register("birthday")} />
                {errors.birthday && (
                  <p className="text-sm text-red-500">{errors.birthday.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday2">生日2（可选）</Label>
                <Input id="birthday2" type="date" {...form.register("birthday2")} />
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="wechat" className="space-y-4">
          <GlassContainer>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appId">AppID</Label>
                <Input id="appId" {...form.register("appId")} />
                {errors.appId && (
                  <p className="text-sm text-red-500">{errors.appId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="appSecret">AppSecret</Label>
                <Input id="appSecret" type="password" {...form.register("appSecret")} />
                {errors.appSecret && (
                  <p className="text-sm text-red-500">{errors.appSecret.message}</p>
                )}
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="templateId">模板ID</Label>
                <Input id="templateId" {...form.register("templateId")} />
                {errors.templateId && (
                  <p className="text-sm text-red-500">{errors.templateId.message}</p>
                )}
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <GlassContainer>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="oneType">一言类型</Label>
                <Input id="oneType" {...form.register("oneType")} placeholder="a" />
              </div>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
      </div>
    </form>
  );
}
