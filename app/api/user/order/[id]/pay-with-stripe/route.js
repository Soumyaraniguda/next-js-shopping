import Order from "@/models/Order";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const PUT = async (request, { params }) => {
  let responseData = {};
  let responseStatus = 500;

  try {
    await db.connectToDB();
    const orderId = params.id;
    let orderDetails = await Order.findById(orderId);

    const { amount, paymentId } = await request.json();
    const paymentData = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Because it always expects cents
      currency: "USD",
      description: "Purchase Jeans",
      payment_method: paymentId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log(paymentData);

    if (orderDetails) {
      // Update the order details in database
      orderDetails.isPaid = true;
      orderDetails.paidOn = Date.now();
      orderDetails.paymentResult = {
        id: paymentData.id,
        status: paymentData.status,
        email_address: paymentData.email_address,
      };
      await orderDetails.save();
      responseData = {
        success: true,
      };
      responseStatus = 200;
    } else {
      responseData = {
        message: "Order not found",
      };
      responseStatus = 500;
    }

    await db.disConnectDB();
    return NextResponse.json(responseData, {
      status: responseStatus,
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
