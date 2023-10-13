import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const url = new URL(request.url);
  const style = url.searchParams.get("style") || 0;
  const size = url.searchParams.get("size") || 0;

  try {
    await db.connectToDB();
    const { products } = await request.json();
    const promises = products.map(async (p) => {
      const productFromDB = await Product.findById(p._id).lean();
      const subProduct = productFromDB.subProducts[p.style];

      const originalPrice = subProduct.sizes.find(
        (x) => x.size == p.size
      ).price;
      const quantity = subProduct.sizes.find((x) => x.size == p.size).qty;
      const discount = subProduct.discount;
      const priceAfterDiscount = !discount
        ? originalPrice
        : originalPrice - originalPrice / Number(discount);

      return {
        ...p,
        priceBefore: originalPrice,
        price: priceAfterDiscount,
        discount,
        quantity,
        shippingFee: productFromDB.shipping,
      };
    });
    const data = await Promise.all(promises);
    await db.disConnectDB();

    return NextResponse.json(data, {
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
