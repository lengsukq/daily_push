import { NextRequest, NextResponse } from "next/server";
import { getQlConnection } from "@/lib/db";
import { qlApiClient } from "@/lib/api/qinglong";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const config = await getQlConnection();
    if (!config) {
      return NextResponse.json({ error: "未配置青龙连接" }, { status: 400 });
    }
    const data = await qlApiClient.getEnvById(config, Number(params.id));
    return NextResponse.json(data);
  } catch (error) {
    console.error("[envs:get]", error);
    return NextResponse.json(
      { error: "获取环境变量失败", detail: (error as Error).message },
      { status: 502 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const config = await getQlConnection();
    if (!config) {
      return NextResponse.json({ error: "未配置青龙连接" }, { status: 400 });
    }
    const data = await qlApiClient.updateEnv(config, Number(params.id), body);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[envs:put]", error);
    return NextResponse.json(
      { error: "更新环境变量失败", detail: (error as Error).message },
      { status: 502 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const config = await getQlConnection();
    if (!config) {
      return NextResponse.json({ error: "未配置青龙连接" }, { status: 400 });
    }
    const data = await qlApiClient.deleteEnvs(config, [Number(params.id)]);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[envs:delete]", error);
    return NextResponse.json(
      { error: "删除环境变量失败", detail: (error as Error).message },
      { status: 502 }
    );
  }
}
