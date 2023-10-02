import Product from "@/models/Product";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const style = url.searchParams.get("style") || 0;
  const size = url.searchParams.get("size") || 0;
  const slug = params.slug;

  try {
    await db.connectToDB();
    let products = await Product.find().sort({ createdAt: -1 }).lean();

    let product = null;
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].slug === slug) {
        product = products[i];
        index = i;
        break;
      }
    }
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes.map((s) => s.price).sort((a, b) => a - b);
    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;

    let transformedProduct = {
      ...product,
      images: subProduct.images,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      sku: subProduct.sku,
      colors: product.subProducts.map((p) => p.color),
      priceRanges:
        prices.length > 1
          ? `From ${prices[0]} to ${prices[prices.length - 1]}$`
          : "",
      price,
      quantity: product.subProducts[style].sizes[size].qty,
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
