import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { telegramId } = body;

    if (!telegramId) {
      return NextResponse.json({ message: "Missing telegramId" }, { status: 400 });
    }

    // Check if the user has referred at least 5 users
    const referralsCount = await prisma.referral.count({
      where: { referrerId: BigInt(telegramId) },
    });

    if (referralsCount < 3) {
      return NextResponse.json(
        { success: false, message: "You haven't referred enough users." },
        { status: 400 }
      );
    }

    // Update the user's points
    const user = await prisma.user.update({
      where: { telegramId: BigInt(telegramId) },
      data: { points: { increment: 5000 } },
    });

    return NextResponse.json({ success: true, points: user.points }, { status: 200 });
  } catch (error) {
    // Narrowing the 'error' type
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error checking referrals:", errorMessage);

    return NextResponse.json(
      { message: "Internal server error", error: errorMessage },
      { status: 500 }
    );
  }
}

