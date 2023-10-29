import Category from "@/models/Category";
import Order from "@/models/Order";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await db.connectToDB();
    let orderDetails = await Order.findById(params.id).populate("user").lean();

    await db.disConnectDB();
    return NextResponse.json(orderDetails, {
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
