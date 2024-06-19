"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  console.log("ramp function in ");

  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();

  const result = await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });

  console.log(result);

  return {
    message: "Done",
  };
}
