import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const baseUrl = request.nextUrl.origin;
  const pathName = request.nextUrl.pathname;

  // console.log("middelware called");

  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    return NextResponse.redirect(
      new URL(
        `/sign-in${pathName ? `?callbackUrl=${pathName}` : ""}`,
        request.url
      ),
      request
    );
  }

  if (pathName.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(baseUrl);
  }

  // Clone the request headers and set a new header `x-hello-from-middleware1`
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("debba", "hello");

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next();

  // response.headers.set("abba", "hello");

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/checkout/:path*", "/order/:path*", "/admin/:path*"],
};
