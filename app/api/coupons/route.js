import Coupon from "@/models/Coupon";
import db from "@/utils/database";
import {
  INTERNAL_SERVER_ERROR_STATUS,
  UNAUTHORIZED_STATUS,
  ACCESS_DENIED_STATUS,
  CREATE_AND_RETURN_OK_STATUS,
} from "@/utils/statusCodes";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (request, response) => {
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

    const coupons = await Coupon.find({}).sort({ updatedAt: -1 });

    db.disConnectDB();
    return NextResponse.json(
      {
        coupons,
      },
      { status: CREATE_AND_RETURN_OK_STATUS }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: INTERNAL_SERVER_ERROR_STATUS }
    );
  }
};

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

    const { coupon, startDate, endDate, discount } = await request.json();
    const alreadyExist = await Coupon.findOne({ coupon });
    if (alreadyExist) {
      return NextResponse.json(
        { message: "This Coupon name already exist, try another name." },
        {
          status: 400,
        }
      );
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    await db.disConnectDB();
    return NextResponse.json(
      {
        message: "Coupon created successfully",
        coupons: await Coupon.find({}),
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

export const PUT = async (request, res) => {
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

    const { coupon, startDate, endDate, discount, id } = await request.json();
    const alreadyExist = await Coupon.findById(id);
    if (!alreadyExist) {
      return NextResponse.json(
        { message: "Coupon not found" },
        {
          status: 400,
        }
      );
    }
    await Coupon.findByIdAndUpdate(id, {
      coupon,
      startDate,
      endDate,
      discount,
    });

    const updatedCoupons = await Coupon.find({}).sort({ updatedAt: -1 });

    await db.disConnectDB();
    return NextResponse.json(
      {
        message: "Coupon updated successfully",
        coupons: updatedCoupons,
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

export const DELETE = async (request) => {
  const url = new URL(request.url);
  const couponId = url.searchParams.get("id");

  try {
    db.connectToDB();
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

    // Delete Coupon
    await Coupon.findByIdAndRemove(couponId);
    const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
    db.disConnectDB();

    return NextResponse.json(
      { message: `Coupon deleted successfully.`, coupons },
      {
        status: CREATE_AND_RETURN_OK_STATUS,
      }
    );
  } catch (error) {
    db.disConnectDB();
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: INTERNAL_SERVER_ERROR_STATUS,
      }
    );
  }
};
