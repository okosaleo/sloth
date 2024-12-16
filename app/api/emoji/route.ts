import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { telegramId, emoji } = await request.json();

  if (!telegramId || !emoji) {
    return NextResponse.json({ error: "Missing telegramId or emoji" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.username && user.username.includes(emoji)) {
      // Award points if emoji is present
      const updatedUser = await prisma.user.update({
        where: { telegramId: BigInt(telegramId) },
        data: { points: { increment: 2000 } },
      });

      return NextResponse.json({ success: true, points: updatedUser.points });
    } else {
      return NextResponse.json({ error: "You haven't added the emoji yet" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing emoji check:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
