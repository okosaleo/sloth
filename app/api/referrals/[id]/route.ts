import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const telegramId = BigInt(id); // Convert the ID to BigInt as per your schema.

    // Fetch user and their referral details
    const user = await prisma.user.findUnique({
      where: { telegramId },
      include: {
        referrals: true, // Get all referrals made by this user
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // Fetch the referrer information from the Referral model
    const referrals = await prisma.referral.findMany({
      where: {
        referrerId: telegramId,
      },
      select: {
        referrerUsername: true,
      },
    });

    if (!referrals) {
      return new NextResponse(
        JSON.stringify({ error: "No referrals found" }),
        { status: 404 }
      );
    }

    const response = {
      referrals: referrals,
      referralCount: user.referrals.length, // Count of referrals made by the user
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error fetching referral data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
