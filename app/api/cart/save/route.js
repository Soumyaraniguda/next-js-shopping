import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/database";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req, res) => {
  const url = new URL(req.url);

  try {
    await db.connectToDB();
    let products = [];
    // const { cart, user_id } = await req.json();

    const { cart } = await req.json();

    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    const user_id = token.sub;

    let user = await User.findById(user_id);
    let cartAlreadyExist = await Cart.findOne({ user: user._id });
    if (cartAlreadyExist) {
      await Cart.deleteOne({ user: user._id });
    }

    for (let i = 0; i < cart.length; i++) {
      let productFromDB = await Product.findById(cart[i]._id).lean();

      let subProduct = productFromDB.subProducts[cart[i].style];

      let discount = subProduct.discount;

      let price = Number(
        subProduct.sizes.find((p) => p.size == cart[i].size)?.price || 0
      );

      const priceAfterDiscount = !discount
        ? price
        : price - price / Number(discount);

      let tempProduct = {};
      tempProduct.name = productFromDB.name;
      tempProduct.product = productFromDB._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.image = subProduct.images[0].url;
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      tempProduct.price = priceAfterDiscount.toFixed(2);
      //   tempProduct._uid = `${productFromDB._id}_${product.style}_${size}`;

      products.push(tempProduct);
    }

    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
      const price = products[i].price;
      cartTotal = cartTotal + price * products[i].qty;
    }

    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();

    await db.disConnectDB();
    return NextResponse.json(
      {
        message: "Cart saved",
      },
      {
        status: 200,
      }
    );
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
