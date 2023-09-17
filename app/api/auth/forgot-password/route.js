import User from "@/models/User";
import db from "@/utils/database";
import { validateEmail } from "@/utils/validation";
import { createResetPasswordToken } from "@/utils/tokens";

// POST

import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmails";
import activateEmailTemplate from "@/components/emails/activateEmailTemplate";
import resetPasswordTemplate from "@/components/emails/resetPasswordEmailTemplate";

export const POST = async (req, res) => {
  try {
    await db.connectToDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "This email does not exist",
        },
        {
          status: 400,
        }
      );
    }

    // Create activation token using jwt
    const userId = createResetPasswordToken({
      id: user._id.toString(),
    });

    // Create an rese Password link with token to send an email
    const resetPasswordUrl = `${process.env.BASE_URL}/auth/reset-password/${userId}`;
    sendEmail(
      email,
      resetPasswordUrl,
      "",
      "Reset your password",
      resetPasswordTemplate
    );

    await db.disConnectDB();
    return NextResponse.json(
      {
        message: "An email has been sent to you, use it to reset your password",
      },
      {
        status: 200,
      }
    );

    // Send response to the user
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
