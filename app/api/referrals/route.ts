import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, referrerId, username } = await req.json();

    // Convert referrerId to BigInt
    const referrerIdBigInt = BigInt(referrerId);

    // Check if the referral already exists for this userId and referrerId
    const existingReferral = await prisma.referral.findUnique({
      where: {
        userId_referrerId: {
          userId,
          referrerId: referrerIdBigInt,
        },
      },
    });

    if (existingReferral) {
      return new NextResponse(
        JSON.stringify({ error: "Referral already exists for this user and referrer" }),
        { status: 400 }
      );
    }

    // Create the Referral with the referred user's username
    const newReferral = await prisma.referral.create({
      data: {
        userId,
        referrerId: referrerIdBigInt,
        referrerUsername: username, // Populate with the referred user's username
      },
    });

    // Increment the referrer's points by 200
    const updatedReferrer = await prisma.user.update({
      where: { telegramId: referrerIdBigInt },
      data: {
        points: {
          increment: 200, // Add 200 points to the referrer's total points
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        referral: newReferral,
        referrer: updatedReferrer,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating referral:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create referral" }),
      { status: 500 }
    );
  }
}

