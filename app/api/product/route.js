import Product from "@/models/Product";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await db.connectToDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        data: products,
      },
      {
        status: 200,
      }
    );
    await db.disConnectDB();
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
