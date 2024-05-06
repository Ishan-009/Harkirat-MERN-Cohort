import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "User Get Request Recieved",
  });
}

// Applying Post request and fetching different types of data from requests

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, password } = data;

    // Ensure all required fields are present
    if (!name || !email || !password) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing required fields",
        }),
        {
          status: 400,
        }
      );
    }

    const response = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "User created successfully",
        data: response,
      }),
      {
        status: 201, // Use HTTP 201 for resource creation
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "Error creating user",
      }),
      {
        status: 500,
      }
    );
  }
}

// console.log(data);

// console.log(req.headers.get("Authorization"));
// console.log(req.nextUrl.searchParams.get("id"));
