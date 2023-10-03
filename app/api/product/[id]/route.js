import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const style = url.searchParams.get("style") || 0;
  const size = url.searchParams.get("size") || 0;
  const slug = params.slug;

  try {
    await db.connectToDB();
    let product = await Product.findById(params.id)
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories._id", model: SubCategory })
      .lean();

    // let product = null;
    // let index = -1;

    // for (let i = 0; i < products.length; i++) {
    //   if (products[i].slug === slug) {
    //     product = products[i];
    //     index = i;
    //     break;
    //   }
    // }
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
      priceRange: subProduct.discount
        ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(
            2
          )} to ${(
            prices[prices.length - 1] -
            prices[prices.length - 1] / subProduct.discount
          ).toFixed(2)}$`
        : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
      price: price.toFixed(2),
      priceBefore: priceBefore,
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