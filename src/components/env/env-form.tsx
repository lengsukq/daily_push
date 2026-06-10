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

  const tabConfig = [
    { value: "basic", label: "基本信息", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { value: "weather", label: "天气配置", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
    { value: "anniversary", label: "纪念日", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { value: "wechat", label: "微信模板", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { value: "other", label: "一言配置", icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {tabConfig.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} />
              </svg>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="basic">
          <GlassContainer glowColor="blue">
            <h3 className="text-lg font-semibold text-white mb-4">基本信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">昵称</Label>
                <Input id="name" placeholder="请输入昵称" {...form.register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name2">昵称2（可选）</Label>
                <Input id="name2" placeholder="请输入第二个昵称" {...form.register("name2")} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="toUser">收件人（多个用逗号分隔）</Label>
                <Textarea id="toUser" placeholder="请输入收件人OpenID，多个用逗号分隔" {...form.register("toUser")} rows={3} />
                {errors.toUser && (
                  <p className="text-sm text-red-400">{errors.toUser.message}</p>
                )}
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="weather">
          <GlassContainer glowColor="purple">
            <h3 className="text-lg font-semibold text-white mb-4">天气配置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="location">城市</Label>
                <Input id="location" placeholder="例如: beijing" {...form.register("location")} />
                {errors.location && (
                  <p className="text-sm text-red-400">{errors.location.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="adm">行政区</Label>
                <Input id="adm" placeholder="例如: 朝阳区" {...form.register("adm")} />
                {errors.adm && (
                  <p className="text-sm text-red-400">{errors.adm.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="key">天气API Key</Label>
                <Input id="key" type="password" placeholder="请输入API Key" {...form.register("key")} />
                {errors.key && (
                  <p className="text-sm text-red-400">{errors.key.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weatherIndex">天气指数</Label>
                <Input id="weatherIndex" type="number" placeholder="1-10" {...form.register("weatherIndex")} />
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="anniversary">
          <GlassContainer glowColor="emerald">
            <h3 className="text-lg font-semibold text-white mb-4">纪念日与生日</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="fullInLoveDate">恋爱纪念日</Label>
                <Input id="fullInLoveDate" type="date" {...form.register("fullInLoveDate")} />
                {errors.fullInLoveDate && (
                  <p className="text-sm text-red-400">{errors.fullInLoveDate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday">生日</Label>
                <Input id="birthday" type="date" {...form.register("birthday")} />
                {errors.birthday && (
                  <p className="text-sm text-red-400">{errors.birthday.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday2">生日2（可选）</Label>
                <Input id="birthday2" type="date" {...form.register("birthday2")} />
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="wechat">
          <GlassContainer glowColor="blue">
            <h3 className="text-lg font-semibold text-white mb-4">微信模板配置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="appId">AppID</Label>
                <Input id="appId" placeholder="请输入AppID" {...form.register("appId")} />
                {errors.appId && (
                  <p className="text-sm text-red-400">{errors.appId.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="appSecret">AppSecret</Label>
                <Input id="appSecret" type="password" placeholder="请输入AppSecret" {...form.register("appSecret")} />
                {errors.appSecret && (
                  <p className="text-sm text-red-400">{errors.appSecret.message}</p>
                )}
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="templateId">模板ID</Label>
                <Input id="templateId" placeholder="请输入微信模板ID" {...form.register("templateId")} />
                {errors.templateId && (
                  <p className="text-sm text-red-400">{errors.templateId.message}</p>
                )}
              </div>
            </div>
          </GlassContainer>
        </TabsContent>

        <TabsContent value="other">
          <GlassContainer glowColor="purple">
            <h3 className="text-lg font-semibold text-white mb-4">一言配置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="oneType">一言类型</Label>
                <Input id="oneType" placeholder="a" {...form.register("oneType")} />
                <p className="text-xs text-dark-500">可选值: a, b, c, d, e, f, g, h, i, j, k, l</p>
              </div>
            </div>
          </GlassContainer>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          取消
        </Button>
        <Button
          type="submit"
          variant="glow"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              保存中...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              保存
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
