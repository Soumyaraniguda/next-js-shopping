import Product from "@/models/Product";
import db from "@/utils/database";
import {
  INTERNAL_SERVER_ERROR_STATUS,
  UNAUTHORIZED_STATUS,
  ACCESS_DENIED_STATUS,
  CREATE_AND_RETURN_OK_STATUS,
} from "@/utils/statusCodes";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const POST = async (request, res) => {
  try {
    await db.connectToDB();

    // Check the user
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!token) {
      return NextResponse.json(
        { message: "User not found." },
        { status: UNAUTHORIZED_STATUS }
      );
    } else if (token.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied." },
        { status: ACCESS_DENIED_STATUS }
      );
    }

    const { filterData } = await request.json();
    // When passed filterData:["name", "subProducts"] selectString becomes "name subProducts"
    const selectString = filterData.join(" ");
    const products = await Product.find().select(selectString);

    await db.disConnectDB();
    return NextResponse.json(
      {
        message: "Products with filtered data fetched successfully",
        products: products,
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
