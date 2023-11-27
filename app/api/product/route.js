import Product from "@/models/Product";
import db from "@/utils/database";
import {
  CREATE_AND_RETURN_OK_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "@/utils/statusCodes";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await db.connectToDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        products,
      },
      {
        status: CREATE_AND_RETURN_OK_STATUS,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: INTERNAL_SERVER_ERROR_STATUS,
      }
    );
  } finally {
    await db.disConnectDB();
  }
};
