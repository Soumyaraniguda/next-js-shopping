import User from "@/models/User";
import db from "@/utils/database";
import { validateEmail } from "@/utils/validation";
import { createResetPasswordToken } from "@/utils/tokens";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmails";
import resetPasswordTemplate from "@/components/emails/resetPasswordEmailTemplate";

// PUT
export const PUT = async (req, res) => {
  try {
    await db.connectToDB();
    const { userId, password } = await req.json();

    const user = await User.findOne(userId);
    if (!user) {
      return NextResponse.json(
        {
          message: "This email does not exist",
        },
        {
          status: 404,
        }
      );
    }

    // decrypt the password and update it in the database
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });

    // Send email in the response to use for login after resetting password
    await db.disConnectDB();
    return NextResponse.json(
      {
        email: user.email,
      },
      {
        status: 200,
      }
    );

    // Send error to the user
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
