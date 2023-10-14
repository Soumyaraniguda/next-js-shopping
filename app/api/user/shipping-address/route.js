import Cart from "@/models/Cart";
import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    await db.connectToDB();
    const { shippingAddress, userId } = await req.json();
    const user = await User.findById(userId);
    await user.updateOne({
      $push: {
        address: shippingAddress,
      },
    });

    await db.disConnectDB();
    return NextResponse.json(shippingAddress, {
      status: 200,
    });
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
