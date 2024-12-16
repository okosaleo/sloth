
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { telegramId, points } = await request.json();

  if (!telegramId || !points) {
    return NextResponse.json({ error: "Missing userId or points" }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { telegramId: BigInt(telegramId) },
      data: { points: { increment: points } },
    });

    return NextResponse.json({ success: true, points: user.points });
  } catch (error) {
    console.error("Error updating points:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


