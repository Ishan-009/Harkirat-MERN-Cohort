import { Next_Auth } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET() {
  const session = (await getServerSession(Next_Auth)) || "";
  console.log(session);

  return NextResponse.json({
    message: "User Session  Details",
    data: session,
  });
}
