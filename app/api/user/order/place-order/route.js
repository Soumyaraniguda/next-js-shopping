import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import db from "@/utils/database";
import User from "@/models/User";
import Order from "@/models/Order";

export const POST = async (req, res) => {
  try {
    await db.connectToDB();
    const {
      products,
      shippingAddress,
      paymentMethod,
      totalCost,
      totalCostBeforeDiscount,
      couponApplied,
    } = await req.json();

    const token = await getToken({
      req: req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    const userId = token.sub;
    const user = await User.findById(userId);

    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      totalCost,
      totalCostBeforeDiscount,
      couponApplied,
    }).save();

    await db.disConnectDB();
    return NextResponse.json(
      {
        order_id: newOrder._id,
      },
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
  } finally {
    await db.disConnectDB();
  }
};
