import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
import superjson from "superjson"


export async function POST(req: NextRequest) {
    try {
    const userData = await req.json()
    console.log("Received userData:", userData.json)
   
      const user = await prisma.user.create({
        data: {
          telegramId: userData.json.id,
          firstName: userData.json.first_name || "",
          lastName: userData.json.last_name || "",
          username: userData.json.username,
        },
      });
  
      return new NextResponse(superjson.stringify(user), {status: 201});
    } catch (error) {
      console.error(error);
      return new NextResponse(JSON.stringify({error: "Failed to save user to database"}), {status: 500});
    }
  }






