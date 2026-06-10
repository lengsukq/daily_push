import { NextRequest, NextResponse } from "next/server";
import { getQlConnection, upsertQlConnection } from "@/lib/db";

export async function GET() {
  try {
    const config = await getQlConnection();
    if (!config) {
      return NextResponse.json({ data: null });
    }
    return NextResponse.json({ data: config });
  } catch (error) {
    console.error("[config:get]", error);
    return NextResponse.json({ error: "获取配置失败" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, token } = body;

    if (!url || !token) {
      return NextResponse.json(
        { error: "URL 和 Token 不能为空" },
        { status: 400 }
      );
    }

    upsertQlConnection(url, token);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[config:post]", error);
    return NextResponse.json({ error: "保存配置失败" }, { status: 500 });
  }
}
