import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import superjson from "superjson"

export async function GET(req: NextRequest,{params} : {params: {id: string} }) {
  const { id } = params
    try {
      const telegramId = BigInt(id); 

      if (req.method === "GET") {
        const user = await prisma.user.findUnique({
          where: {
            telegramId,
          },
        });
        console.log(user)
  
        if (!user) {
          return new NextResponse(JSON.stringify({ error: "User not Found" }), { status: 404 });
        }
        return new NextResponse(superjson.stringify(user));
      } else {
        return new NextResponse(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
      }
    } catch (error) {
      console.error("Error:", error);
      return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
