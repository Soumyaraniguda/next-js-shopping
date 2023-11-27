import Category from "@/models/Category";
import db from "@/utils/database";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  ACCESS_DENIED_STATUS,
  CONFLICT_STATUS,
  CREATE_AND_RETURN_OK_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND,
  UNAUTHORIZED_STATUS,
} from "@/utils/statusCodes";
import { createSlug } from "@/utils/data";

export const GET = async (request, { params }) => {
  try {
    db.connectToDB();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    db.disConnectDB();
    return NextResponse.json(
      { categories },
      { status: CREATE_AND_RETURN_OK_STATUS }
    );
  } catch (error) {
    db.disConnectDB();
    return NextResponse.json(
      { error },
      { status: INTERNAL_SERVER_ERROR_STATUS }
    );
  }
};

export const POST = async (request, response) => {
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

    const { name } = await request.json();
    const alreadyExist = await Category.findOne({ name });
    // Already exist
    if (alreadyExist) {
      return NextResponse.json(
        { message: "Category already exist. Try a different name." },
        { status: CONFLICT_STATUS }
      );
    }

    const slug = createSlug(name);
    await new Category({ name, slug }).save();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();

    db.disConnectDB();
    return NextResponse.json(
      { message: `Category "${name}" created successfully.`, categories },
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

export const PUT = async (request) => {
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

    const { id, name } = await request.json();
    const category = await Category.findById(id);
    // Category not found
    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: NOT_FOUND }
      );
    }

    await Category.findByIdAndUpdate(id, { name });
    const updateCategories = await Category.find({})
      .sort({ updatedAt: -1 })
      .lean();
    // const updateCategories = await Category.findOneAndUpdate(
    //   { _id: id },
    //   { name },
    //   { returnOriginal: false }
    // )
    //   .sort({ updatedAt: -1 })
    //   .lean();

    db.disConnectDB();
    return NextResponse.json(
      {
        message: `Category updated successfully.`,
        categories: updateCategories,
      },
      {
        status: CREATE_AND_RETURN_OK_STATUS,
      }
    );
  } catch (error) {
    console.log(error);
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

export const DELETE = async (request) => {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("id");

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

    // Delete category
    await Category.findByIdAndRemove(categoryId);
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    db.disConnectDB();

    return NextResponse.json(
      { message: `Category deleted successfully.`, categories },
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
