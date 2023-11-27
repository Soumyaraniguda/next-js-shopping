import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import { createSlug } from "@/utils/data";
import db from "@/utils/database";
import {
  CREATE_AND_RETURN_OK_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "@/utils/statusCodes";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  try {
    if (!category) {
      return NextResponse.json(
        { subCategories: [] },
        { status: CREATE_AND_RETURN_OK_STATUS }
      );
    }
    db.connectToDB();
    const subCategories = await SubCategory.find({ parent: category })
      .select("name")
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
