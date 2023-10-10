import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const style = url.searchParams.get("style") || 0;
  const size = url.searchParams.get("size") || 0;

  try {
    await db.connectToDB();
    let product = await Product.findById(params.id).lean();

    let subProduct = product.subProducts[style];

    let discount = subProduct.discount;
    let priceBefore = subProduct.sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;

    let transformedProduct = {
      _id: product._id,
      style: Number(style),
      size: subProduct.sizes[size].size,
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: subProduct.sku,
      images: subProduct.images,
      color: subProduct.color,
      brand: product.brand,
      price,
      priceBefore,
      discount,
      quantity: subProduct.sizes[size].qty,
      shipping: product.shipping,
    };

    await db.disConnectDB();
    return NextResponse.json(transformedProduct, {
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
