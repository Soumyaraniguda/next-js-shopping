import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import { createSlug } from "@/utils/data";
import db from "@/utils/database";
import {
  UNAUTHORIZED_STATUS,
  ACCESS_DENIED_STATUS,
  CREATE_AND_RETURN_OK_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND,
} from "@/utils/statusCodes";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    db.connectToDB();
    const subCategories = await SubCategory.find({})
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean();
    db.disConnectDB();
    return NextResponse.json(
      { subCategories },
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

    const { name, parentCategory } = await request.json();
    const alreadyExist = await SubCategory.findOne({ name });
    // Already exist
    if (alreadyExist) {
      return NextResponse.json(
        { message: "Sub-category already exist. Try a different name." },
        { status: CONFLICT_STATUS }
      );
    }

    const slug = createSlug(name);
    await new SubCategory({ name, parent: parentCategory, slug }).save();
    const subCategories = await SubCategory.find({})
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean();

    db.disConnectDB();
    return NextResponse.json(
      {
        message: `Sub-category "${name}" created successfully.`,
        subCategories,
      },
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

    const { id, name, parent } = await request.json();
    const subCategory = await SubCategory.findById(id);
    // Sub-category not found
    if (!subCategory) {
      return NextResponse.json(
        { message: "Sub-category not found." },
        { status: NOT_FOUND }
      );
    }

    await SubCategory.findByIdAndUpdate(id, { name, parent });
    const updateSubCategories = await SubCategory.find({})
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean();

    db.disConnectDB();
    return NextResponse.json(
      {
        message: `Sub-category updated successfully.`,
        subCategories: updateSubCategories,
      },
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

export const DELETE = async (request) => {
  const url = new URL(request.url);
  const subCategoryId = url.searchParams.get("id");

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
    await SubCategory.findByIdAndRemove(subCategoryId);
    const subCategories = await SubCategory.find({})
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean();
    db.disConnectDB();

    return NextResponse.json(
      { message: `Sub-category deleted successfully.`, subCategories },
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
