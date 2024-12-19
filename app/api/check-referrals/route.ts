import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { telegramId } = body;
  
      if (!telegramId) {
        console.error("Missing telegramId");
        return NextResponse.json({ message: "Missing telegramId" }, { status: 400 });
      }
  
      const referralsCount = await prisma.referral.count({
        where: { referrerId: BigInt(telegramId) },
      });
  
      if (referralsCount < 3) {
        console.log(`Referrals count for ${telegramId}: ${referralsCount}`);
        return NextResponse.json(
          { success: false, message: "You haven't referred enough users." },
          { status: 400 }
        );
      }
  
      const user = await prisma.user.update({
        where: { telegramId: BigInt(telegramId) },
        data: { points: { increment: 5000 } },
      });
  
      console.log(`User ${telegramId} awarded 5000 points.`);
      return NextResponse.json({ success: true, points: user.points }, { status: 200 });
    } catch (error) {
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
  

