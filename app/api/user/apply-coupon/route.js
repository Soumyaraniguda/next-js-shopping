import Coupon from "@/models/Coupon";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Cart from "@/models/Cart";
import db from "@/utils/database";
import User from "@/models/User";

export const POST = async (req, res) => {
  try {
    await db.connectToDB();
    const { coupon } = await req.json();
    const token = await getToken({
      req: req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    const userId = token.sub;
    const user = await User.findById(userId);

    const existingCoupon = await Coupon.findOne({ coupon });
    if (!existingCoupon) {
      return NextResponse.json(
        {
          message: "Invalid coupon",
        },
        {
          status: 400,
        }
      );
    }

    const { cartTotal } = await Cart.findOne({ user: user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * existingCoupon.discount) / 100;

    // Update the totalAfterDiscount in the database for this Cart
    await Cart.findOneAndUpdate(
      { user: user },
      { cartTotalAfterDiscount: totalAfterDiscount }
    );
    const discount = existingCoupon.discount;

    await db.disConnectDB();
    return NextResponse.json(
      {
        totalAfterDiscount: totalAfterDiscount.toFixed(2),
        discount: discount,
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
