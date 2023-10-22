import Cart from "@/models/Cart";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  // const userId = url.searchParams.get("userId");

  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const userId = token.sub;

  try {
    await db.connectToDB();
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: user._id });

    await db.disConnectDB();

    return NextResponse.json(
      { cart, user },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
