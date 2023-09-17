import { verifyResetPasswordToken } from "@/utils/tokens";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const data = await verifyResetPasswordToken(params.token);
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Not a valid token",
      },
      {
        status: 500,
      }
    );
  }
};
