import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req, res) => {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    const userId = token.sub;
    await db.connectToDB();
    // const { shippingAddress, userId } = await req.json();
    const { shippingAddress } = await req.json();
    const newData = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          address: shippingAddress,
        },
      },
      { returnOriginal: false }
    );

    // const user = await User.findById(userId);
    // await user.updateOne({
    //   $push: {
    //     address: shippingAddress,
    //   },
    // });

    await db.disConnectDB();
    return NextResponse.json(newData.address, {
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

export const PUT = async (req, res) => {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    const userId = token.sub;
    await db.connectToDB();

    const { addressId } = await req.json();
    const user = await User.findById(userId);
    const userAddresses = user.address;

    let addresses = [];
    for (let i = 0; i < userAddresses.length; i++) {
      let tempAddress = {};
      if (userAddresses[i]._id == addressId) {
        tempAddress = { ...userAddresses[i].toObject(), active: true };
        addresses.push(tempAddress);
      } else {
        tempAddress = { ...userAddresses[i].toObject(), active: false };
        addresses.push(tempAddress);
      }
    }

    const newData = await User.findOneAndUpdate(
      { _id: user._id },
      { address: addresses },
      { returnOriginal: false }
    );

    await db.disConnectDB();
    return NextResponse.json(newData.address, {
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
