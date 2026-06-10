import { NextRequest, NextResponse } from "next/server";
import { getQlConnection } from "@/lib/db";
import { qlApiClient } from "@/lib/api/qinglong";

export async function GET() {
  try {
    const config = await getQlConnection();
    if (!config) {
      return NextResponse.json(
        { error: "未配置青龙连接，请先在设置页面配置" },
        { status: 400 }
      );
    }
    const data = await qlApiClient.getEnvs(config);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[envs]", error);
    return NextResponse.json(
      { error: "青龙面板请求失败", detail: (error as Error).message },
      { status: 502 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const config = await getQlConnection();
    if (!config) {
      return NextResponse.json(
        { error: "未配置青龙连接" },
        { status: 400 }
      );
    }
    const data = await qlApiClient.createEnv(config, body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("[envs:post]", error);
    return NextResponse.json(
      { error: "创建环境变量失败", detail: (error as Error).message },
      { status: 502 }
    );
  }
}
