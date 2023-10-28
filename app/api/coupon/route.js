import Coupon from "@/models/Coupon";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    await db.connectToDB();
    const { coupon, startDate, endDate, discount } = await req.json();
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
