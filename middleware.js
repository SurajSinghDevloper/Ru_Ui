import { NextResponse } from "next/server";

const protectedRoutes = ["/components", "/components/Main"];

export default function middleware(req) {
  let cookie = req.cookies.get("token");

  if (!cookie && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
