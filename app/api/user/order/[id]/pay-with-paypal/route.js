import Order from "@/models/Order";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  try {
    await db.connectToDB();
    const { details } = await request.json();

    const orderId = params.id;
    let orderDetails = await Order.findById(orderId);

    if (orderDetails) {
      orderDetails.isPaid = true;
      orderDetails.paidOn = Date.now();
      orderDetails.paymentResult = {
        id: details.id,
        status: details.status,
        email_address: details.email_address,
      };

      const newOrder = await orderDetails.save();
      await db.disConnectDB();
      return NextResponse.json(
        { message: "Order is paid with paypal", order: newOrder },
        {
          status: 200,
        }
      );
    } else {
      await db.disConnectDB();
      return NextResponse.json(
        { message: "Order not found" },
        {
          status: 404,
        }
      );
    }
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
