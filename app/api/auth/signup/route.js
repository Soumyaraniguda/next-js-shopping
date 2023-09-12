import User from "@/models/User";
import bcrypt from "bcrypt";
import db from "@/utils/database";
import { validateEmail } from "@/utils/validation";
import { createActivationToken } from "@/utils/tokens";

// POST

import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmails";

export const POST = async (req, res) => {
  try {
    await db.connectToDB();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Please enter all fields",
        },
        {
          status: 400,
        }
      );
    }
    // Validate email
    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          message: "Invalid email",
        },
        {
          status: 400,
        }
      );
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return NextResponse.json(
        {
          message: "This email already exist",
        },
        {
          status: 400,
        }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be atleast 6 characters",
        },
        {
          status: 400,
        }
      );
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    // Create and save user in database
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();

    // Create activation token using jwt
    const activationToken = createActivationToken({
      id: addedUser._id.toString(),
    });

    // Create an activation link with token to send an email
    const url = `${process.env.BASE_URL}/activate/${activationToken}`;
    sendEmail(email, url, "", "Activate your account");
    await db.disConnectDB();
    return NextResponse.json(
      {
        message: "Register success! Please activate your email to start",
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
